import { Component, OnInit } from '@angular/core';

// Inject the router
import { Router } from '@angular/router';


//Firebase
import { AuthService } from '../../auth/auth.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'page-login',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  contactForm: FormGroup;
  public errorMessage = '';

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
      console.log(err.message)
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
