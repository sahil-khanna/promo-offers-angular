import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertHelper } from '../common/service/alert-helper.service';
import { StorageService } from '../common/service/storage.service';
import { Router } from '@angular/router';
import { GlobalsService } from '../common/service/globals.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {

	public email: FormControl = new FormControl();
	public password: FormControl = new FormControl();
	public form = new FormGroup({
		email: this.email,
		password: this.password,
	});

	constructor(
		private webservice: WebServiceService,
		private alertHelper: AlertHelper,
		private router: Router,
		private storage: StorageService,
		private globals: GlobalsService,
		private constants: ConstantsService
	) { }

	public login() {
		if (this.form.invalid) {
			this.email.markAsTouched();
			this.password.markAsTouched();
			return;
		}

		const $this = this;
		this.webservice.execute({
			method: 'login',
			body: {
				email: this.email.value,
				password: this.password.value,
			},
			loadingMessage: '',
			priority: 'high',
			callback: function (_response) {
				if (_response.code === 0) {
					$this.globals.token = _response.data.token;
					$this.storage.setDataForKey($this.constants.USER_PROFILE, _response.data.profile);
					$this.storage.setDataForKey($this.constants.TOKEN, _response.data.token);
					$this.storage.setDataForKey($this.constants.ROLE_ID, _response.data.roleId);
					$this.router.navigate(['home']);
				} else {
					$this.alertHelper.push({
						text: _response.message,
						type: 'error'
					});
				}
			}
		});
	}

}
