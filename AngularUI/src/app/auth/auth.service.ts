import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class AuthService {

  public signUpErrorMessage: Subject<string> = new Subject<string>();
  public loginErrorMessage: Subject<string> = new Subject<string>(); 
  // JWT to check if the user is authenticated
  token: string = '';

  constructor(
    public afAuth: AngularFireAuth,
      private router: Router){}

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
      (res) => {
        this.logout();
      }
    )
    .catch(
        (error) => {
            console.log(error);
            this.signUpErrorMessage.next(error.message);
        }
    );
  }

  signInUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
          (response) => {
              console.log(response);
              this.setToken();
              this.router.navigate(['/']);
          }
      ).catch(
          (error) => {
              console.log(error);
              this.loginErrorMessage.next(error.message);
          }
      );
  }

  getToken() {
      // This is an asynchronous action.
      this.setToken();
      return this.token;
  }

  setToken() {
      firebase.auth().currentUser.getIdToken().then(
          (token) => {
              this.token = token;
              console.log(this.token);
              console.log(this.isAuthenticated());
          }
      );
  }

  isAuthenticated() {
      return (firebase.auth().currentUser != null);
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['../login']);
  }
}