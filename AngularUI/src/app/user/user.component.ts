import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getUserInfo(): string {
    var user = firebase.auth().currentUser;
    var name, email, uid;
    let result: string = '';

    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.

      result = "email: " + email + " uid: " + uid;
    }
    return result;
  }

  updateUserProfile() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  updateUserEmail() {
    var user = firebase.auth().currentUser;

    user.updateEmail("user@example.com").then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  updateUserPassword() {
    var user = firebase.auth().currentUser;
    var newPassword = "";

    user.updatePassword(newPassword).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  deleteUserAccount() {
    var user = firebase.auth().currentUser;

    user.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
    });
  }


}
