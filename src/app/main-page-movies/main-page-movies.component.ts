import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-main-page-movies',
  templateUrl: './main-page-movies.component.html',
  styleUrls: ['./main-page-movies.component.scss']
})
export class MainPageMoviesComponent implements OnInit {
  @Input() movies: Movie[] = [];

  constructor(@Inject('BaseImgURL') private BaseImgURL) { }

  ngOnInit() {
  }

}
