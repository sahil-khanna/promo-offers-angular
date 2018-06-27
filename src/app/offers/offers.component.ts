import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { StorageService } from '../common/service/storage.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: ['./offers.component.css']
})
export class OffersComponent {

	private offers = null;
	private readonly roleId;

	constructor(
		private webservice: WebServiceService,
		private alertHelper: AlertHelper,
		private storage: StorageService,
		private constants: ConstantsService
	) {
		this.roleId = this.storage.getDataForKey(this.constants.ROLE_ID);
		this.refreshList();
	}

	private refreshList() {
		const $this = this;
		this.webservice.execute({
			method: 'offers',
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
					$this.offers = _response.data;
				}
			}
		});
	}
}
