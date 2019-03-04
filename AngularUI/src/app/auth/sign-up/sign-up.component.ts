import { Component, OnInit, OnDestroy } from '@angular/core';

//Firebase
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  errorMessage: string;
  messageSubscription: Subscription;

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }

    this.messageSubscription = this.authService.signUpErrorMessage.subscribe((msg) => {
      this.errorMessage = msg;
    });
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

  constructor(
    public authService: AuthService, private router: Router) {
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/user']);
     }, err => console.log(err)
     )
   }

   signUp(form: NgForm) {
     this.authService.signupUser(form.value.email, form.value.password);
   }
}