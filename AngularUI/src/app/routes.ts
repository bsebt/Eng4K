import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { UserResolver } from './user/user.resolver';
import { HomeComponent } from './home/home-component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, resolve: { data: UserResolver} }, //new
    { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}
  ];