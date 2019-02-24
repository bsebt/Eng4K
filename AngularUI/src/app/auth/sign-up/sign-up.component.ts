import { Component, OnInit } from '@angular/core';

//Firebase
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
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

  //  tryRegister(value){
  //    this.authService.doRegister(value)
  //    .then(res => {
  //      console.log(res);
  //      this.errorMessage = "";
  //      this.successMessage = "Your account has been created";
  //      // After the user signs up, Firebase automatically authenticates
  //      // the user and logs the user in immdeiately. We don't want this. 
  //      // We want to sign up the user but logging them out in the background
  //      // To prevent auto-login.
  //      this.authService.doLogout();
  //      setTimeout(() => {
  //       this.successMessage = "Navigating back to login page..";
  //      },
  //     1000);
  //      setTimeout(() => {
  //       this.router.navigate(['/login']);
  //      },
  //     3000);
  //    }, err => {
  //      console.log(err);
  //      this.errorMessage = err.message;
  //      this.successMessage = "";
  //    })
  //  }

}