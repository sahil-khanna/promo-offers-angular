import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { GlobalsService } from '../common/service/globals.service';
import { Utils } from '../common/service/utils.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-edit-vendor',
	templateUrl: './edit-vendor.component.html',
	styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent {

	private name: FormControl = new FormControl();
	private description: FormControl = new FormControl();
	private website: FormControl = new FormControl();
	private email: FormControl = new FormControl();
	private image: String = null;
	private existingVendor: any = null;

	private form = new FormGroup({
		name: this.name,
		description: this.description,
		email: this.email,
		website: this.website
	});

	constructor(
		private activatedRoute: ActivatedRoute,
		private webservice: WebServiceService,
		private alertHelper: AlertHelper,
		private globals: GlobalsService,
		private utils: Utils,
		private router: Router,
		private constants: ConstantsService
	) {
		this.image = constants.IMAGE_PLACEHOLDER;

		const $this = this;
		this.activatedRoute.queryParams.subscribe((params: any) => {
			if (JSON.stringify(params).length > 2) {
				$this.existingVendor = params;
				$this.name.disable();
				this.email.disable();
				$this.fillData();
			}
		});
	}

	private fillData() {
		if (this.existingVendor) {
			this.name.setValue(this.existingVendor.name);
			this.description.setValue(this.existingVendor.description);
			this.email.setValue(this.existingVendor.email);
			this.website.setValue(this.existingVendor.website);
			this.image = this.existingVendor.image ? this.existingVendor.image : this.constants.IMAGE_PLACEHOLDER;
		} else {
			this.name.setValue('');
			this.description.setValue('');
			this.email.setValue('');
			this.website.setValue('');
			this.image = this.constants.IMAGE_PLACEHOLDER;
		}
	}

	/*
	*  Update profile only is the form is not Pristine
	*/
	private submit() {
		if (this.form.invalid || this.image === this.constants.IMAGE_PLACEHOLDER) {
			this.name.markAsTouched();
			this.description.markAsTouched();
			this.website.markAsTouched();
			this.email.markAsTouched();
			return;
		}

		if (!this.form.dirty && this.image.search('data:image') === -1) {
			this.alertHelper.push({
				text: 'Information updated successfully',
				type: 'success'
			});
			return;
		}

		const $this = this;

		const body: any = {
			name: this.name.value,
			description: this.description.value,
			website: this.website.value,
			email: this.email.value,
			image: (this.image.search('data:image') === -1) ? 'no_change' : this.image,
		};

		let method = null;

		if (this.existingVendor) {
			body.id = this.existingVendor._id;
			method = 'update-vendor';
		} else {
			method = 'create-vendor';
		}

		this.webservice.execute({
			method: method,
			body: body,
			loadingMessage: '',
			priority: 'high',
			callback: function (_response: any) {
				$this.alertHelper.push({
					text: _response.message,
					type: (_response.code === 0) ? 'success' : 'error'
				});

				if (_response.code === 0) {
					$this.form.markAsPristine();
					$this.router.navigate(['vendors']);
				} else {
					$this.fillData();   // Fill UI with old values
				}
			}
		});
	}

	private imageSelected(event) {
		const $this = this;

		const fileReader = new FileReader();
		fileReader.onload = function (e: any) {
			$this.image = e.target.result;
		};

		fileReader.readAsDataURL(event.target.files[0]);
	}

	private delete() {
		const $this = this;
		this.alertHelper.push({
			text: 'Are you sure you want to delete?',
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Yes',
			onConfirm: function() {
				$this.webservice.execute({
					method: 'delete-vendor',
					loadingMessage: '',
					urlParams: {
						id: $this.existingVendor._id
					},
					priority: 'high',
					callback: function(_response) {
						$this.alertHelper.push({
							text: _response.message,
							type: (_response.code === 0) ? 'success' : 'error'
						});

						if (_response.code === 0) {
							$this.router.navigate(['vendors']);
						}
					}
				});
			}
		});
	}

	private changeStatus() {
		const body: any = {
			name: this.name.value,
			description: this.description.value,
			website: this.website.value,
			email: this.email.value,
			image: (this.image.search('data:image') === -1) ? 'no_change' : this.image,
			id: this.existingVendor._id,
			isEnabled: !(this.existingVendor.isEnabled === 'true')
		};

		const $this = this;
		this.alertHelper.push({
			text: 'Are you sure you want to ' + ((this.existingVendor.isEnabled === 'true') ? 'disable?' : 'enable?'),
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Yes',
			onConfirm: function() {
				$this.webservice.execute({
					method: 'update-vendor',
					loadingMessage: '',
					body: body,
					priority: 'high',
					callback: function(_response) {
						$this.alertHelper.push({
							text: _response.message,
							type: (_response.code === 0) ? 'success' : 'error'
						});

						if (_response.code === 0) {
							$this.router.navigate(['vendors']);
						}
					}
				});
			}
		});
	}

}
