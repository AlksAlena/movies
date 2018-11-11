import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable, Subject, of, BehaviorSubject, concat } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, withLatestFrom, map } from 'rxjs/operators';

import { Movie } from '../shared/movie';
import { MovieService } from '../services/movie.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss']
})
export class PopularMoviesComponent implements OnInit {
  popularMovies$: Observable<Movie[]>;
  findMovies$: Observable<Movie[]>;
  private searchTerms = new Subject<string>();

  countOfResults$: Observable<number>;

  private index = new BehaviorSubject<number>(1);
  currentPage$: Observable<number>;

  pageEvent: PageEvent;
  
  constructor(
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    @Inject('BaseImgURL') private BaseImgURL
   ) { }

  ngOnInit() {
    // actual count of results for popular or found movies
    this.countOfResults$ = this.movieService.count
      .pipe(switchMap((count: number) => of(count)));
    // current page of the paginator
    this.currentPage$ = this.index
      .pipe(switchMap((page: number) => of(page)));  

    this.popularMovies$ = this.currentPage$
      .pipe(switchMap((page: number) => this.movieService.getPopularMovies(page)));

    this.findMovies$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.getSearchMovies(term))
    );
  }

  addFavoriteMovie(id: number, movie: Movie): void {
    this.favoriteService.addFavoriteMovie(id, movie);
  }

  deleteFavoriteMovie(id: number, movie: Movie): void {
    this.favoriteService.deleteFavoriteMovie(id, movie);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    if (!term.trim()) return;
    this.searchTerms.next(term);
  }

  handlePaginator(event): void {
    let index = event.pageIndex + 1;
    this.index.next(index);
  }

}
