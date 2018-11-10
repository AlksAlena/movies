/*
 * import { baseURL } from './shared/baseurl'; in App.module
 * providers: [ {provide: 'BaseURL', useValue: baseURL} ]
 * @Inject('BaseURL') private BaseURL in constructor() of component
*/
export const baseURL = 'https://api.themoviedb.org/3';

export const baseImgURL = 'https://image.tmdb.org/t/p/w500';