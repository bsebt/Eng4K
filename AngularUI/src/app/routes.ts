import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {HomeComponent} from './home/home-component'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home', component: HomeComponent,
        canActivate: [AuthGuard]
    },
    // If we are in the default page, redirect to sign up.
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];