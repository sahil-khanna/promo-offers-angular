import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
	selector: 'app-vendors',
	templateUrl: './vendors.component.html',
	styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {

	private vendors = null;

	constructor(
		private webservice: WebServiceService,
		private alertHelper: AlertHelper
	) {
		this.refreshList();
	}

	private refreshList() {
		const $this = this;
		this.webservice.execute({
			method: 'vendors',
			loadingMessage: '',
			urlParams: {
				skip: 0,
				limit: 20
			},
			priority: 'high',
			callback: function(_response) {
				if (_response.code !== 0) {
					$this.alertHelper.push({text: _response.text});
				} else {
					$this.vendors = _response.data;
				}
			}
		});
	}
}
