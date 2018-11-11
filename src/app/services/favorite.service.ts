import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../shared/movie';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  /**
    * Download favorite movies object from LocalStorage,
    * return array from object
   */
  getFavoriteMovies(): Movie[] {
    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    return this.arrayFromObject(favoriteMoviesObject);
  }

  /*
   * Update favoriteMovies property and update view,
   * download favorite movies object from LocalStorage,
   * adds movie and upload object to LocalStorage
  */
  addFavoriteMovie(id: number, movie: Movie): void {
    // TODO: sets the fill star icon that points to add movie to the favorite collection
    movie.favorite = true;
    // TODO: adds movie in favorite collection and update view

    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    if (favoriteMoviesObject) {
      favoriteMoviesObject[id] = movie;
      this.uploadToLocalStorage("favoriteMovies", favoriteMoviesObject);
    } else {
      let newFavoriteMoviesList = {};
      newFavoriteMoviesList[id] = movie;
      this.uploadToLocalStorage("favoriteMovies", newFavoriteMoviesList);
    }
  }

  /*
   * Download favorite movies object from LocalStorage,
   * search movie key and delete movie from object, 
   * upload update object to LocalStorage
  */
  deleteFavoriteMovie(id: number, movie: Movie): void {
    // TODO: removes star icon that points the removal movie from the favorite collection
    movie.favorite = false;

    let favoriteMoviesObject = this.downloadFromLocalStorage("favoriteMovies");
    let key = id.toString();
    if (key in favoriteMoviesObject) {
      delete favoriteMoviesObject[key];
      this.uploadToLocalStorage("favoriteMovies", favoriteMoviesObject);
    }
  }

  /**
    * Check that the film from favorites
   */  
  fromFavoriteCollection(movie: Movie): void {
    let favoriteObject = this.downloadFromLocalStorage("favoriteMovies");
    if (movie.id in favoriteObject) movie.favorite = true;
    else movie.favorite = false;
  }

  private arrayFromObject(obj: object): any[] {
    let newArray = [];
    for (let key in obj) {
      newArray.push(obj[key]);   
    }
    return newArray;
  }

  private downloadFromLocalStorage(key: string): object {
    let value = JSON.parse(localStorage.getItem(key))
    return value;
  }

  private uploadToLocalStorage(key: string, value: any): void {
    let serialValue = JSON.stringify(value);
    localStorage.setItem(key, serialValue);
  }

}
