import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home-component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { UserComponent } from './user/user.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent}, //new
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'files', component: ListUploadComponent, canActivate: [AuthGuard]},
    { path: 'upload', component: FormUploadComponent, canActivate: [AuthGuard]},
];