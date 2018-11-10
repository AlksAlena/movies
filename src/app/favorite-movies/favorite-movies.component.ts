import { Component, OnInit, Inject } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {

  constructor(
    public favoriteService: FavoriteService,
    @Inject('BaseImgURL') private BaseImgURL
  ) { }

  ngOnInit() {
    this.favoriteService.getFavoriteMovies();
  }

}
