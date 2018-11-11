import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMoviesComponent } from './main-page-movies.component';

describe('MainPageMoviesComponent', () => {
  let component: MainPageMoviesComponent;
  let fixture: ComponentFixture<MainPageMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
