import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Utils } from '../common/service/utils.service';
import { ConstantsService } from '../common/service/constants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { StorageService } from '../common/service/storage.service';

@Component({
	selector: 'app-offer',
	templateUrl: './edit-offer.component.html',
	styleUrls: ['./edit-offer.component.css'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{
			provide: MAT_DATE_FORMATS, useValue: {
				display: {
					dateInput: 'DD MMM YYYY',
					monthYearLabel: 'MMM YYYY'
				},
			}
		},
	],
})
export class EditOfferComponent {

	private title = new FormControl();
	private description = new FormControl();
	private offerStart = new FormControl();
	private offerEnd = new FormControl();
	private minPurchaseAmount = new FormControl();
	private maxDiscountAmount = new FormControl();
	private discountPercent = new FormControl();
	private offerType = new FormControl();
	private fixedDiscountAmount = new FormControl();

	private minDate = moment();
	private maxDate = moment().add(6, 'month');

	private existingOffer: any = null;

	private form = new FormGroup({
		title: this.title,
		description: this.description,
		offerStart: this.offerStart,
		offerEnd: this.offerEnd,
		minPurchaseAmount: this.minPurchaseAmount,
		maxDiscountAmount: this.maxDiscountAmount,
		discountPercent: this.discountPercent,
		offerType: this.offerType,
		fixedDiscountAmount: this.fixedDiscountAmount
	});

	constructor(
		private utils: Utils,
		private constants: ConstantsService,
		private activatedRoute: ActivatedRoute,
		private webservice: WebServiceService,
		private alertHelper: AlertHelper,
		private router: Router,
		private storage: StorageService
	) {
		const $this = this;
		this.activatedRoute.queryParams.subscribe((params: any) => {
			if (JSON.stringify(params).length > 2) {
				$this.existingOffer = params;
				$this.fillData();
			}
		});
	}

	private fillData() {
		if (this.existingOffer) {
			this.title.setValue(this.existingOffer.name);
			this.description.setValue(this.existingOffer.description);
			this.offerStart.setValue(this.existingOffer.offerStart);
			this.offerEnd.setValue(this.existingOffer.offerEnd);
			this.offerType.setValue(this.existingOffer.type);
			this.minPurchaseAmount.setValue(this.existingOffer.minPurchaseAmount);
			this.fixedDiscountAmount.setValue(this.existingOffer.fixedDiscountAmount);
			this.discountPercent.setValue(this.existingOffer.discountPercent);
			this.maxDiscountAmount.setValue(this.existingOffer.maxDiscountAmount);
		} else {
			this.title.setValue('');
			this.description.setValue('');
			this.offerStart.setValue('');
			this.offerEnd.setValue('');
			this.offerType.setValue('');
		}
	}

	private submit() {
		if (this.form.invalid) {
			for (const key in this.form.controls) {
				if (this.form.controls.hasOwnProperty(key)) {
					this.form.controls[key].markAsTouched();
				}
			}
			return;
		}

		const body: any = {
			title: this.title.value,
			description: this.description.value,
			offerStart: this.offerStart.value.format(this.constants.DATE_FORMAT_DD_MM_YYYY),
			offerEnd: this.offerEnd.value.format(this.constants.DATE_FORMAT_DD_MM_YYYY),
			minPurchaseAmount: this.minPurchaseAmount.value,
			type: this.offerType.value,
			vendorId: this.storage.getDataForKey(this.constants.USER_PROFILE).id
		};

		if (this.offerType.value === 'percent') {
			body.discountPercent = this.discountPercent.value;
			body.maxDiscountAmount = this.maxDiscountAmount.value;
		} else {
			body.fixedDiscountAmount = this.fixedDiscountAmount.value;
		}

		let method = null;

		if (this.existingOffer) {
			body.id = this.existingOffer._id;
			method = 'update-offer';
		} else {
			method = 'create-offer';
		}

		const $this = this;
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
					$this.router.navigate(['home']);
				} else {
					// $this.fillData();   // Fill UI with old values
				}
			}
		});
	}
}
