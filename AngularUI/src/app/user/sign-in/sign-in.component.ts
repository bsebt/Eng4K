import { Component, OnInit } from '@angular/core';
// Import NgForm
import { NgForm } from '@angular/forms';
// Inject the router
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../../shared/user.service';

//Firebase
import { AuthService } from '../../auth/auth.service'
import { Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';


// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent implements OnInit {

//   constructor(private service: UserService, private router: Router) { }

//   model = {
//     email: '',
//     password: ''
//   }
//   regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   errorMessages: string;
//   ngOnInit() {
//   }

//   onSubmit(form: NgForm) {
//     this.service.login(form.value).subscribe(
//       res => {
//         this.service.setupJwtToken(res['token']);
//         this.router.navigateByUrl('/userprofile');
//       },
//       err => {
//         this.errorMessages = err.error.message;
//       }
//     );
//   }

// }

@Component({
  selector: 'page-login',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  contactForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.createContact();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  createContact() {
    this.contactForm = this.fb.group({
      email: ['', Validators.required],
      name: [''],
      comments: ['']
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/user']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

  tryContact(value) {
    this.authService.doContact(value)
    .then(res => {
       
    }, err => {
     console.log(err);
    })
  }
}
