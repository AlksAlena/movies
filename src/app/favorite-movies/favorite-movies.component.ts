import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(
    public favoriteService: FavoriteService,
    @Inject('BaseImgURL') private BaseImgURL
  ) { }

  ngOnInit() {
    this.favoriteMovies = this.favoriteService.getFavoriteMovies();
  }

  deleteFavoriteMovie(id: number, movie: Movie): void {
    this.favoriteMovies = this.favoriteMovies.filter(movie => movie.id !== id);
    this.favoriteService.deleteFavoriteMovie(id, movie);
  }

}
