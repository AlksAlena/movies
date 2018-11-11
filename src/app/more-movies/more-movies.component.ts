import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-more-movies',
  templateUrl: './more-movies.component.html',
  styleUrls: ['./more-movies.component.scss']
})
export class MoreMoviesComponent implements OnInit {
  @Input() title: string;
  @Input() movies: Movie[] = []; 

  constructor(@Inject('BaseImgURL') private BaseImgURL) { }

  ngOnInit() {
  }

}
