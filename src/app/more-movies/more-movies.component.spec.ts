import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreMoviesComponent } from './more-movies.component';

describe('MoreMoviesComponent', () => {
  let component: MoreMoviesComponent;
  let fixture: ComponentFixture<MoreMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
