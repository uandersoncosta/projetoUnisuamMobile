import { Component } from '@angular/core';
import { ThemoviedbService } from '../projects/api/service/themoviedb.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from '../authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ThemoviedbService],
})
export class Tab2Page {
  listaFilmes: any[] = [];
  filteredFilmes: any[] = [];
  public page: number = 1;
  searchTerm: string = '';

  constructor(
    public theMoviedbService: ThemoviedbService,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.carregarFilmes();
  }

  async carregarFilmes() {
    const loading = await this.loadingController.create({
      message: 'Carregando filmes',
      spinner: 'lines',
    });
    await loading.present();

    this.theMoviedbService.getPopularMovies(this.page).subscribe({
      next: (data: any) => {
        const response = data;
        this.listaFilmes = response.articles;
        this.filteredFilmes = [...this.listaFilmes];
        console.log(this.listaFilmes);
        loading.dismiss();
      },
      error: (error: any) => {
        console.log('Erro ao carregar filmes:', error);
        loading.dismiss();
      }
    });
  }

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

  async efeitoRefresh(event: any) {
    this.page = 1;
    await this.carregarFilmes();
    event.target.complete();
    console.log("Finalizando refresh");
  }

  loadMoreData(event: any) {
    this.page += 1;
    this.theMoviedbService.getPopularMovies(this.page).subscribe({
      next: (data: any) => {
        const response = data;
        this.listaFilmes = this.listaFilmes.concat(response.articles);
        this.filteredFilmes = this.filteredFilmes.concat(response.articles);
        console.log(this.listaFilmes);
        event.target.complete();
      },
      error: (error: any) => {
        console.log('Erro ao carregar mais filmes:', error);
        event.target.complete();
      }
    });
  }

  filterMovies(event: any) {
    const val = event.target.value.toLowerCase();
    if (val && val.trim() !== '') {
      this.filteredFilmes = this.listaFilmes.filter((filme) => {
        return filme.title.toLowerCase().indexOf(val) > -1;
      });
    } else {
      this.filteredFilmes = [...this.listaFilmes];
    }
  }

  async logout() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']); // Redireciona para a página de login após o logout
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  }
}
