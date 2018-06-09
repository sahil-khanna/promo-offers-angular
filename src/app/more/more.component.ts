import { Component } from '@angular/core';
import { Utils } from '../common/service/utils.service';
import { StorageService } from '../common/service/storage.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { GlobalsService } from '../common/service/globals.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-more',
	templateUrl: './more.component.html',
	styleUrls: ['./more.component.css']
})
export class MoreComponent {

	private userEmail: string;
	private showProfile: boolean;

	constructor(
		private utils: Utils,
		private storage: StorageService,
		private alertHelper: AlertHelper,
		private globals: GlobalsService,
		private constants: ConstantsService
	) {
		this.userEmail = this.storage.getDataForKey(constants.USER_PROFILE).email;
		this.showProfile = this.storage.getDataForKey(constants.ROLE_ID) === constants.ROLE_USER;
		this.globals.showTabBar = true;
	}

	public logout() {
		const $this = this;
		this.alertHelper.push({
			title: 'Logout',
			text: 'Are you sure you want to logout from app?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'Cancel',
			onConfirm: function () {
				$this.utils.logout();
			}
		});
	}

}
