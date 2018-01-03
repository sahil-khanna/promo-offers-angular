import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WebServiceService } from './common/service/web-service/web-service.service';
import { Utils } from './common/service/utils.service';
import { AlertHelper } from './common/service/alert-helper.service';
import { HomeComponent } from './home/home.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const appRoutes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate-account/:key', component: ActivateAccountComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ActivateAccountComponent
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
    WebServiceService,
    HttpClientModule,
    HttpClient,
    Utils,
    AlertHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
