import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Utils } from '../common/service/utils.service';

@Component({
	selector: 'app-offer',
	templateUrl: './offer.component.html',
	styleUrls: ['./offer.component.css'],
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
export class OfferComponent {

	private title = new FormControl();
	private description = new FormControl();
	private offerStart = new FormControl();
	private offerEnd = new FormControl();
	private minPurchaseAmount = new FormControl();
	private maxDiscountAmount = new FormControl();
	private discountPercent = new FormControl();

	private minDate = moment();
	private maxDate = moment().add(6, 'month');

	private form = new FormGroup({
		title: this.title,
		description: this.description,
		offerStart: this.offerStart,
		offerEnd: this.offerEnd,
		minPurchaseAmount: this.minPurchaseAmount,
		maxDiscountAmount: this.maxDiscountAmount,
		discountPercent: this.discountPercent
	});

	constructor(
		private utils: Utils
	) { }

	private submit() {
		if (this.form.invalid) {
			this.title.markAsTouched();
			this.description.markAsTouched();
			this.offerStart.markAsTouched();
			this.offerEnd.markAsTouched();
			this.minPurchaseAmount.markAsTouched();
			this.maxDiscountAmount.markAsTouched();
			this.discountPercent.markAsTouched();
			return;
		}
	}
}
