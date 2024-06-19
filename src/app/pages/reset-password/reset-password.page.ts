import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email:any

  constructor(public route: Router,public authService:AuthenticationService) { }

  ngOnInit() {
  }

  async resetPasword(){
   this.authService.resetPassword(this.email)
  }
}
