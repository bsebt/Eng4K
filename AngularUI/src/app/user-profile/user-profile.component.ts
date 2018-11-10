// import { Component, OnInit } from '@angular/core';

// // User service and router
// import { UserService } from '../shared/user.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UserProfileComponent implements OnInit {
//   userDetails;
//   constructor(private service: UserService, private router: Router) { }

//   ngOnInit() {
//     this.service.getUserProfile().subscribe(
//       res => {
//         this.userDetails = res['user'];
//       }, 
//       err => {

//       }
//     );
//   }

//   onLogout() {
//     this.service.removeJwtToken();
//     this.router.navigate(['/login']);
//   }

//   onHome() {
//     this.router.navigate(['/home']);
//   }

// }
