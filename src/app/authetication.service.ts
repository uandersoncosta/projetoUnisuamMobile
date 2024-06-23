import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Atualizado o caminho
import { UserCredential } from '@firebase/auth-types';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public ngFireAuth: AngularFireAuth) { }

  async registerUser(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error; // Lança o erro para ser tratado no componente que chama este método
    }
  }

  async loginUser(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error; // Lança o erro para ser tratado no componente que chama este método
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.ngFireAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error);
      throw error; // Lança o erro para ser tratado no componente que chama este método
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.ngFireAuth.signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error; // Lança o erro para ser tratado no componente que chama este método
    }
  }

  async getCurrentUser(): Promise<firebase.User | null> {
    return await this.ngFireAuth.currentUser;
  }
}
