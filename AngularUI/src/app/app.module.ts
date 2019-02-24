// built-in imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// components
import { AppComponent } from './app.component';
//import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { UserService } from './shared/user.service';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';

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
import { LoginComponent } from './auth/sign-in/sign-in.component';
import { RegisterComponent } from './auth/sign-up/sign-up.component';
import { AuthService } from './auth/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { HeaderComponent } from './core/header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';

// Font awesome
import { FileFilterPipe } from './shared/file-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent, //SignUpComponent,
    //UserProfileComponent,
    LoginComponent,//SignInComponent,
    HomeComponent,
    FormUploadComponent, 
    ListUploadComponent, 
    DetailsUploadComponent, 
    HeaderComponent,
    DropdownDirective,
    FileFilterPipe
  ],
  imports: [
  
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule, Ng2PageScrollModule,
    RoundProgressModule,
    MatToolbarModule,
    MatTabsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AuthService, UserService, AuthGuard, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }