import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from '../shared/movie';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  key: string = '88c251203ff6e58c3bf673d929d72e8f';
  recommendedMovies: Movie[] = [];
  similarMovies: Movie[] = [];
  genres: object[] = [];
  errMsg: object = null;

  constructor(private http: HttpClient) {
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
   */
  getPopularMovies(): Observable<Movie[]>  {
    return this.http.get<Movie[]>(baseURL + '/movie/popular?api_key=' + this.key)
      .pipe(map(data => data['results']));
  }

  /**
    * Get the list of official genres for movies.
    * docs https://developers.themoviedb.org/3/genres/get-movie-list
    * GET /genre/movie/list
   */  
  getGenres(): Observable<object[]> {
    return this.http.get<Movie[]>(baseURL + '/genre/movie/list?api_key=' + this.key)
      .pipe(map(data => data['genres']));
  }

  /**
    * Function to search the genres appropriate to each key 
    * from the movie.genre_ids: number[]
    * and set corresponding genres to the movie.genres: string[]
   */  
  setGenresToMovie(movies: Movie[]): Movie[] {
    let moviesWithGenres = movies.map(item => {
      // TODO: initial movie's this property not exist
      item.genres = [];

      let genresForMovie: string[] = item.genre_ids.map(id => {
        let genreObject = this.genres.find(item => id === item['id']);
        return genreObject['name'];
      });

      item.genres = item.genres.concat(genresForMovie);
      return item;
    });

    return moviesWithGenres;
  }

  /**
    * Get the primary information about a movie.
    * docs https://developers.themoviedb.org/3/movies/get-movie-details
    * GET /movie/{movie_id}
   */  
  getMovieDetails(id: number): Observable<Movie> {
    this.getRecommendedMovies(id).subscribe(movies => {
      this.recommendedMovies = [];
      this.recommendedMovies = this.setGenresToMovie(movies);
    });
    this.getSimilarMovies(id).subscribe(movies => {
      this.similarMovies = [];
      this.similarMovies = this.setGenresToMovie(movies);
    });
    return this.http.get<Movie>(baseURL + '/movie/' + id + '?api_key=' + this.key);
  }

  /**
    * Get a list of recommended movies for a movie.
    * docs https://developers.themoviedb.org/3/movies/get-movie-recommendations
    * GET /movie/{movie_id}/recommendations
   */
  getRecommendedMovies(id: number): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(baseURL + '/movie/' + id + '/recommendations?api_key=' + this.key)
      .pipe(map(data => data['results']));
  }

  /**
    * Get a list of similar movies. 
    * This is not the same as the "Recommendation" system you see on the website. 
    * These items are assembled by looking at keywords and genres.
    * docs https://developers.themoviedb.org/3/movies/get-similar-movies
    * GET /movie/{movie_id}/similar
   */
  getSimilarMovies(id: number): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(baseURL + '/movie/' + id + '/similar?api_key=' + this.key)
      .pipe(map(data => data['results']));
  }

  /**
    * Search for movies.
    * docs https://developers.themoviedb.org/3/search/search-movies
    * GET /search/movie
   */
  getSearchMovie(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(baseURL + '/search/movie?api_key=' + this.key)
      .pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

}

 