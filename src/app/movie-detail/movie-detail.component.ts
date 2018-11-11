import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {  
  recTitle: string = 'Recommendations';
  simTitle: string = 'Similar movies';

  id$: Observable<number>;
  movie$: Observable<Movie>;
  recommendedMovies$: Observable<Movie[]>;
  similarMovies$: Observable<Movie[]>;


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
     * the new object details of the film  
     * and loads of similar and recommended films
     */
    this.id$ = this.route.params.pipe(switchMap(p => of(p.id)));
    this.movie$ = this.id$.pipe(switchMap(id => this.movieService.getMovieDetails(id)));
    this.recommendedMovies$ = this.id$.pipe(switchMap(id => this.movieService.getRecommendedMovies(id)));
    this.similarMovies$ = this.id$.pipe(switchMap(id => this.movieService.getSimilarMovies(id)));
  }
  
  goBack(): void {
    this.location.back();
  }

}
