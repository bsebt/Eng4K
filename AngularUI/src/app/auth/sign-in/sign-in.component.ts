import { Component, OnInit, OnDestroy } from '@angular/core';

// Inject the router
import { Router } from '@angular/router';


//Firebase
import { AuthService } from '../../auth/auth.service'

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'page-login',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public errorMessage: string;
  messageSubscription: Subscription;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.messageSubscription = this.authService.loginErrorMessage.subscribe((msg) => {
      this.errorMessage = msg;
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
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