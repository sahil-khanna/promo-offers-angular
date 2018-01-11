import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WebServiceService } from './common/service/web-service.service';
import { GlobalsService } from './common/service/globals.service';
import { Utils } from './common/service/utils.service';
import { AlertHelper } from './common/service/alert-helper.service';
import { StorageService } from './common/service/storage.service';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { IncidentComponent } from './incident/incident.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { MoreComponent } from './more/more.component';
import { CustomReuseStrategy } from './custom-reuse-strategy';

const appRoutes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account/:key', component: ActivateAccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'more', component: MoreComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ActivateAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    IncidentComponent,
    TabBarComponent,
    MoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    Utils,
    AlertHelper,
    StorageService,
    WebServiceService,
    GlobalsService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
