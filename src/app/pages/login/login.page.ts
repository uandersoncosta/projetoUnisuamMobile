import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authetication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}")
      ]]
    });
  }

  async signIn() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    if (this.loginForm.valid) {
      try {
        const userCredential = await this.authService.loginUser(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        
        // Verifica se o login foi bem-sucedido
        if (userCredential) {
          loading.dismiss();
          this.router.navigate(['/home']); // Redireciona para a página home após o login
        } else {
          loading.dismiss();
          this.presentToast('Credenciais inválidas');
        }
      } catch (error) {
        loading.dismiss();
        console.error('Erro ao fazer login:', error);
        this.presentToast('Erro ao fazer login. Verifique suas credenciais.');
      }
    } else {
      loading.dismiss();
      this.presentToast('Por favor, preencha todos os campos corretamente.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para acessar os controles de erro no template
  get errorControl() {
    return this.loginForm.controls;
  }
}
