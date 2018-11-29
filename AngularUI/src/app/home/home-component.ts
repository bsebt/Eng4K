import { HttpClient } from '@angular/common/http';
import { FirebaseUserModel } from '../shared/user.model';
import { environment } from '../../environments/environment';

import { Component, OnInit } from '@angular/core';


//Firebase
import { UserService } from '../shared/user.service';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';




@Component({
    selector: 'app-root',
    templateUrl: './home-component.html',
    styleUrls: ['./home-component.css']
  })

export class HomeComponent {
  title = 'JavaSampleApproach';
  description = 'Angular-Firebase Demo';



}


  