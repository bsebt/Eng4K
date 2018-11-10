import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/sign-in/sign-in.component';
//import {HomeComponent} from './home/home-component'
//import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UserResolver } from './user/user.resolver';
import { HomeComponent } from './home/home-component';

// export const appRoutes: Routes = [
//     {
//         path: 'signup', component: UserComponent,
//         children: [{ path: '', component: SignUpComponent }]
//     },
//     {
//         path: 'login', component: UserComponent,
//         children: [{ path: '', component: SignInComponent }]
//     },
//     {
//         path: 'userprofile', component: UserProfileComponent,
//         canActivate: [AuthGuard]
//     },
//     {
//         path: 'home', component: HomeComponent,
//         canActivate: [AuthGuard]
//     },
//     // If we are in the default page, redirect to sign up.
//     {
//         path: '', redirectTo: '/login', pathMatch: 'full'
//     }
// ];

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, resolve: { data: UserResolver} }, //new
    { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
  ];