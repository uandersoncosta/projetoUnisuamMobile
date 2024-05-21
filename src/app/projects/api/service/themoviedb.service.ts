import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TrendingAllItem {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemoviedbService {
  constructor(private http: HttpClient) {}
  private apiKey: string = 'c99cd1ab9066c1e5ed74173252360bf1';

  private generateCommonParams(): { headers: HttpHeaders; params: HttpParams } {
    const headers = new HttpHeaders();
    const params = new HttpParams()
      .set('language', 'pt-BR')
      .set('api_key', this.apiKey);
    return { headers, params };
  }

  // Get a list of movies ordered by popularity.
  getPopularList(): Observable<any> {
    const requestUrl =
      'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';
    const { headers, params } = this.generateCommonParams();
    return this.http.get(requestUrl, { headers, params });
  }

  //Get a list of movies that are currently in theatres.
  getNowPlayingList(): Observable<any> {
    const requestUrl =
      'https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1';
    const { headers, params } = this.generateCommonParams();
    return this.http.get(requestUrl, { headers, params });
  }

  getTrendingAll(): Observable<{ results: TrendingAllItem[] }> {
    const requestUrl = 'https://api.themoviedb.org/3/trending/all/day';
    const { headers, params } = this.generateCommonParams();
    return this.http.get<{ results: TrendingAllItem[] }>(requestUrl, { headers, params });
  }

  getMovieDetailList(movie_id: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/movie/${movie_id}?language=pt-BR`;
    const { headers, params } = this.generateCommonParams();
    return this.http.get(requestUrl, { headers, params });
  }
  getMovieVideo(movie_id: string): Observable<any> {
    const requestUrl = `https://api.themoviedb.org/3/movie/${movie_id}?language=pt-BR`;
    const { headers, params } = this.generateCommonParams();
    return this.http.get(requestUrl, { headers, params });
  }
}