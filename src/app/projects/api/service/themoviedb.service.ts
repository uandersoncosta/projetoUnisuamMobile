import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


// -----> REFIZ O CODIGO POIS ANTERIORMENTE DAVA ERRO <-----
@Injectable({
  providedIn: 'root', 
})

export class ThemoviedbService {

  private chave="93c34f1f0f9fccd46c2dfee35628d74a";
  private caminhoPadrao="https://api.themoviedb.org/3";
  
  constructor(public http:HttpClient) { }

  public getPopularMovies(page=1, language="pt") {
    let filmes=`${this.caminhoPadrao}/movie/popular?page=${page}&language=${language}&api_key=${this.chave}`
    return this.http.get(filmes);
  }
}
  

/*  -----> AQUI PRA BAIXO EU NÃO ENTENDI MAS PRESERVEI O CODIGO CASO FUNCIONE POSTERIORMENTE. <-----

  @Injectable({
  providedIn: 'root',
})
export class ThemoviedbService {
  constructor(private http: HttpClient) {}
  private apiKey: string = 'c99cd1ab9066c1e5ed74173252360bf1';

  // Não entendi esses codigos abaixo, 
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
} */