import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  id: number;
  movie: Movie;

  constructor(
    public movieService: MovieService,
    public favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseImgURL') private BaseImgURL
  ) { }

  ngOnInit() {
  /*
   * Each change of a /moviedetails/:id component retrieves 
   * the new object details of the film, sets the genres, 
   * and loads of similar and recommended films
   */
  this.route.params
    .pipe(switchMap((params: Params) => {
      this.id = +params['id'];
      return this.movieService.getMovieDetails(this.id);
    }))
    .subscribe(movie => {
      // TODO: get the movie and set the genres manually
      this.movie = movie;
      let genresOfMovie = this.movie.genres.map(item => item['name']);
      this.movie.genres = genresOfMovie;
      // TODO: check that the film from favorites
      this.favoriteService.fromFavoriteCollection(this.movie);
      });
  }
  
  goBack(): void {
    this.location.back();
  }

}
