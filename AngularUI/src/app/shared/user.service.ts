import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import user and environment object.
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = {
    fullName: '',
    email: '',
    password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True'}) };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.baseUrl+'/register',user, this.noAuthHeader);
  }

  login(credentials) {
    return this.http.post(environment.baseUrl+'/authenticate', credentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.baseUrl+'/userprofile');
  }

  setupJwtToken(token: string) {
    localStorage.setItem('token', token);
  }

  getJwtToken() {
    return localStorage.getItem('token');
  }

  removeJwtToken() {
    localStorage.removeItem('token');
  }

  getUserPayLoad() {
    var token = this.getJwtToken();
    if (token) {
      // token.split('.') creates an array of 3 items
      // array[1] accesses the JWT token payload.
      var jwtPayload = atob(token.split('.')[1]);
      return JSON.parse(jwtPayload);
    } else {
      return null;
    }
  }

  isUserLoggedIn() {
    var jwtPayload = this.getUserPayLoad();
    // Check if user is logged in based on JWT expiration date.
    if (jwtPayload) {
      return jwtPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
