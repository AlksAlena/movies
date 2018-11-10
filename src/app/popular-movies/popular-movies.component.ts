import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
  movies: Movie[];
  movieTitle: string = '';
  countOfResults: number = 234;
  // <input type="text" placeholder="Search" (keyup)="onSearch($event.target.value)"> 
  
  constructor(
    private movieService: MovieService,
    public favoriteService: FavoriteService,
    @Inject('BaseImgURL') private BaseImgURL
   ) { }

  ngOnInit() {
    this.movieService.getPopularMovies()
      .subscribe((movies: Movie[]) => {
        this.movies = this.movieService.setGenresToMovie(movies);
        this.movies.forEach(movie => {
          this.favoriteService.fromFavoriteCollection(movie);
        });
      })  
  }

}
