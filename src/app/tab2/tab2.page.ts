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
  public page: number = 1;

  constructor(
    public theMoviedbService: ThemoviedbService,
    public loadingController: LoadingController,
  ){
    // Carrega filmes ao inicializar o componente
    this.carregarFilmes();
  }
  
  // Método feito carregar filmes da API.
  async carregarFilmes() {
    const loading = await this.loadingController.create({
      message: 'Carregando filmes',
      spinner: 'lines',
    });
    await loading.present();

     // Chama o serviço para obter os filmes.
    this.theMoviedbService.getPopularMovies(this.page, 'pt').subscribe({
      next: (data: any) => {
        const response = data;
        this.listaFilmes = response.results;
        console.log(this.listaFilmes);
        loading.dismiss();
      },
      error: (error: any) => {
        console.log('Erro ao carregar filmes:', error);
        loading.dismiss();
      }
    });
  }

  // Método para definir um spinner por um tempo definido.
  async efeitoLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando filmes',
      duration: 1000,
      spinner: 'lines',
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }
  //Ação de refresh puxando para baixo.
  async efeitoRefresh(event: any) {
    this.page = 1;
    await this.carregarFilmes();
    event.target.complete();
    console.log("Finalizando refresh");
  }
}