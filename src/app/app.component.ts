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

	private roleId;

	constructor(
		private globals: GlobalsService,
		private router: Router,
		private storage: StorageService,
		private constants: ConstantsService
	) {
		if ((this.globals.token = this.storage.getDataForKey(this.constants.TOKEN)) == null) {
			this.router.navigate(['login']);
		} else {
			this.router.navigate(['home']);
		}
	}
}
