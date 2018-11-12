// built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
//import { SignUpComponent } from './user/sign-up/sign-up.component';


//Routing
//import { appRoutes } from './routes';
//import { UserProfileComponent } from './user-profile/user-profile.component';
//import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';

// Authentication - will prob have to remove
import { AuthGuard } from './auth/auth.guard';
//import { AuthInterceptor } from './auth/auth.interceptor';
import { HomeComponent } from './home/home-component';

//Firebsae
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { rootRouterConfig } from './routes';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './user/sign-in/sign-in.component';
import { RegisterComponent } from './user/sign-up/sign-up.component';
import { UserResolver } from './user/user.resolver';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './home/upload-file/upload-file.component';
import { FormUploadComponent } from './home/form-upload/form-upload.component';
import { ListUploadComponent } from './home/list-upload/list-upload.component';
import { DetailsUploadComponent } from './home/details-upload/details-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent, //SignUpComponent,
    //UserProfileComponent,
    LoginComponent,//SignInComponent,
    HomeComponent, UploadFileComponent, FormUploadComponent, ListUploadComponent, DetailsUploadComponent //new
  ],
  imports: [
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // BrowserModule,
    // FormsModule,
    // RouterModule.forRoot(appRoutes),
    // HttpClientModule
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }