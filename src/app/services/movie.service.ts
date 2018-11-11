import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from '../shared/movie';
import { baseURL } from '../shared/baseurl';
import { FavoriteService } from '../services/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private key: string = '88c251203ff6e58c3bf673d929d72e8f';
  
  count = new Subject<number>();

  genres: object[] = [];
  errMsg: object = null;

  constructor(
    private http: HttpClient,
    private favoriteService: FavoriteService
  ) {
    // TODO: get all genres object[]
    this.getGenres()
      .subscribe(
        genres => this.genres = genres,
        error => this.errMsg = error
      ); 
  }
  
  /**
    * Get a list of the current popular movies on TMDb. 
    * This list updates daily.
    * docs https://developers.themoviedb.org/3/movies/get-popular-movies
    * GET /movie/popular
    *
    * for each movie sets genres property with appropriate genres
   */
  getPopularMovies(page: number = 1): Observable<Movie[]>  {
    return this.http.get<Movie[]>(`${baseURL}/movie/popular?api_key=${this.key}&page=${page}`)
      .pipe(map(data => {
        // push count of results in stream
        this.count.next(data['total_results']);
        return data;
      }))
      .pipe(map((data) => {
        return data['results'].map(movie => {
          this.favoriteService.fromFavoriteCollection(movie);
          return this.setGenresToMovie(movie);
        });
      }
    ));
  }

  /**
    * Search for movies.
    * docs https://developers.themoviedb.org/3/search/search-movies
    * GET /search/movie
    *
    * for each movie sets genres property with appropriate genres
   */
  getSearchMovies(word: string, page?: number): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${baseURL}/search/movie?api_key=${this.key}&query=${word}&page=${page}`)
      .pipe(map(data => {
        this.count.next(data['total_results']);
        return data;
      }))
      .pipe(map(data => {
        return data['results'].map(movie => {
          this.favoriteService.fromFavoriteCollection(movie);
          return this.setGenresToMovie(movie);
        });
      }
    ));
  }

  /**
    * Get the primary information about a movie.
    * docs https://developers.themoviedb.org/3/movies/get-movie-details
    * GET /movie/{movie_id}
   */  
  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${baseURL}/movie/${id}?api_key=${this.key}`)
      .pipe(map(movie => {
        console.log(movie);
        this.favoriteService.fromFavoriteCollection(movie);
        movie.genres = movie.genres.map(item => item['name']);
        return movie;       
      }
    ));
  }

  /**
    * Get a list of recommended movies for a movie.
    * docs https://developers.themoviedb.org/3/movies/get-movie-recommendations
    * GET /movie/{movie_id}/recommendations
   */
  getRecommendedMovies(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseURL}/movie/${id}/recommendations?api_key=${this.key}`)
      .pipe(map((data) => {
        return data['results'].map(movie => {
          this.favoriteService.fromFavoriteCollection(movie);
          return this.setGenresToMovie(movie);
        });
      }
    ));
  }

  /**
    * Get a list of similar movies. 
    * This is not the same as the "Recommendation" system you see on the website. 
    * These items are assembled by looking at keywords and genres.
    * docs https://developers.themoviedb.org/3/movies/get-similar-movies
    * GET /movie/{movie_id}/similar
   */
  getSimilarMovies(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${baseURL}/movie/${id}/similar?api_key=${this.key}`)
      .pipe(map((data) => {
        return data['results'].map(movie => {
          this.favoriteService.fromFavoriteCollection(movie);
          return this.setGenresToMovie(movie);
        });
      }
    ));
  }

  /**
    * Get the list of official genres for movies.
    * docs https://developers.themoviedb.org/3/genres/get-movie-list
    * GET /genre/movie/list
   */  
  private getGenres(): Observable<object[]> {
    return this.http.get<Movie[]>(`${baseURL}/genre/movie/list?api_key=${this.key}`)
      .pipe(map(data => data['genres']));
  }

  /**
    * Function to search the genres appropriate to each key 
    * from the movie.genre_ids: number[]
    * and set corresponding genres to the movie.genres: string[]
   */  
  private setGenresToMovie(movie: Movie): Movie {
    // TODO: initial movie's this property not exist
    movie.genres = [];

    let genresForMovie: string[] = movie.genre_ids.map(id => {
      let genreObject = this.genres.find(genre => id === genre['id']);
      return genreObject['name'];
    });

    movie.genres = movie.genres.concat(genresForMovie);

    return movie;
  }

}

 