import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public errorMessage = '';

  constructor(
   public afAuth: AngularFireAuth
 ){}

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

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    }).catch(err => {
      this.errorMessage = err;
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err)
      })
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }


  /**
   * doContact gets invoked when a user click on 'submit' on the contact us jumbotron. 
   * The method will take the email, name and comments and store it in the 'messages'
   * set on firebase.
   * @param value 
   */
  doContact(value) {
    return new Promise<any> ((resolve, reject) => {
      var messagesRef = firebase.database().ref('messages');
      var newMessageRef = messagesRef.push();
      newMessageRef.set({
        name: value.name,
        comments: value.comments,
        email: value.email
      });
    });
  }
}