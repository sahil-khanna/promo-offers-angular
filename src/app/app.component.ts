import { Component } from '@angular/core';
import { GlobalsService } from './common/service/globals.service';
import { StorageService } from './common/service/storage.service';
import { ConstantsService } from './common/service/constants.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
		private globals: GlobalsService,
		private router: Router,
		private storage: StorageService,
		private constants: ConstantsService
	) {
		if ((this.globals.token = this.storage.getDataForKey(this.constants.TOKEN)) == null) {// TODO: use AuthGuard - activatedRoute, RouteSnapShot
			this.router.navigate(['login']);
		} else {
			this.router.navigate(['home']);
		}

		// TODO: show login screen of the token has expired
		// TODO: implement logic on token expiration
	}
}
