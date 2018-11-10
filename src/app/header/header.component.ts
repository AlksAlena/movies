import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string = "Tom";

  constructor() { }

  ngOnInit() {
  }

  /*
  this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required ],
      author: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      date: ''
    });
  this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
     // re(set) from validation messages
  this.onValueChanged();
  */

}
