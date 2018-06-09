import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { MoreComponent } from './more/more.component';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { MyContributionsComponent } from './my-contributions/my-contributions.component';
import { ContributeComponent } from './contribute/contribute.component';
import { OfferComponent } from './offer/offer.component';
import { VendorsComponent } from './vendors/vendors.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { ConstantsService } from './common/service/constants.service';

const appRoutes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'activate-account/:key', component: ActivateAccountComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'my-contributions', component: MyContributionsComponent, reuseComponent: true },
	{ path: 'contribute', component: ContributeComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'more', component: MoreComponent, reuseComponent: true },
	{ path: 'offer', component: OfferComponent },
	{ path: 'vendors', component: VendorsComponent, reuseComponent: false },
	{ path: 'edit-vendor', component: EditVendorComponent }
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
		TabBarComponent,
		MoreComponent,
		MyContributionsComponent,
		ContributeComponent,
		OfferComponent,
		VendorsComponent,
		EditVendorComponent
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
		ConstantsService,
		{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {

	// constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
	// 	matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/material_design_icons.svg'));
	// }

}
