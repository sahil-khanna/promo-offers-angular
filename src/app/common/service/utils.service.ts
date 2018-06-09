import { Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { AlertHelper } from './alert-helper.service';
import { StorageService } from './storage.service';
import { WebServiceService } from './web-service.service';
import { GlobalsService } from './globals.service';
import { Router } from '@angular/router';
import { ConstantsService } from './constants.service';

@Injectable()
export class Utils {

	private alertHelper: AlertHelper;
	private storage: StorageService;
	private webservice: WebServiceService;

	constructor(
		private injector: Injector,
		private router: Router,
		private location: Location,
		private globals: GlobalsService,
		private constants: ConstantsService
	) {
		const $this = this;
		setTimeout(() => {
			$this.alertHelper = $this.injector.get(AlertHelper);
			$this.storage = $this.injector.get(StorageService);
			$this.webservice = $this.injector.get(WebServiceService);
		});
	}

	public showLoadingIndicator(value: boolean, message?: string) {
		this.globals.showLoading = value;
	}

	public nullToObject(sourceType, targetType) {
		if (typeof sourceType === 'number' || typeof sourceType === 'boolean') {
			return sourceType;
		} else {
			return (sourceType == null) ? targetType : sourceType;
		}
	}

	public goBack() {
		this.location.back();
	}

	public logout() {
		this.webservice.clear();
		this.webservice.execute({
			method: 'logout',
			priority: 'high',
			callback: function () { }
		});

		this.storage.clearData();

		this.router.navigate(['login']);
		this.globals.token = null;
	}
}
