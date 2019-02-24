import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        //this.router.navigate(['/home']);
        return resolve(true);
      }, err => {
        return resolve(false);
      })
    })
  }
}
