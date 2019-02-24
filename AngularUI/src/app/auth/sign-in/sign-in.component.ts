import { Component, OnInit } from '@angular/core';

// Inject the router
import { Router } from '@angular/router';


//Firebase
import { AuthService } from '../../auth/auth.service'

import { NgForm } from '@angular/forms';



@Component({
  selector: 'page-login',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage = '';

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/home']);
    })
  }

  tryLogin(form: NgForm){
    this.authService.signInUser(form.value.email, form.value.password);
  }
}