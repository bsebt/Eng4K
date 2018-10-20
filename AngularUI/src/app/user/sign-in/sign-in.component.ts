import { Component, OnInit } from '@angular/core';
// Import NgForm
import { NgForm } from '@angular/forms';
// Inject the router
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  model = {
    email: '',
    password: ''
  }
  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  errorMessages: string;
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      res => {
        this.service.setupJwtToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.errorMessages = err.error.message;
      }
    );
  }

}
