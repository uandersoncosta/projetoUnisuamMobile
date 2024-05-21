import { Component } from '@angular/core';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ThemoviedbService],
})

export class Tab2Page {
  
  listaFilmes: any[] = [];

  constructor( public theMoviedbService:ThemoviedbService) {
    this.theMoviedbService.getPopularMovies(1, 'pt').subscribe({next: (data:any) => {
      const response = data;
      this.listaFilmes = this.listaFilmes.concat(response.results);
      console.log(this.listaFilmes);
    }, error: (error:any) => {
      console.log('Erro ao carregar filmes:', error);
    }
  });
  
  }
}
