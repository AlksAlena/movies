import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from '../shared/movie';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-main-page-movies',
  templateUrl: './main-page-movies.component.html',
  styleUrls: ['./main-page-movies.component.scss']
})
export class MainPageMoviesComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor(
    private favoriteService: FavoriteService,
    @Inject('BaseImgURL') private BaseImgURL
  ) { }

  ngOnInit() {
  }

  addFavoriteMovie(id: number, movie: Movie): void {
    this.favoriteService.addFavoriteMovie(id, movie);
  }

  deleteFavoriteMovie(id: number, movie: Movie): void {
    this.favoriteService.deleteFavoriteMovie(id, movie);
  }

}
