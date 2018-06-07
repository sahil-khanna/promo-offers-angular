import { Component } from '@angular/core';
import { Utils } from '../common/service/utils.service';
import { StorageService } from '../common/service/storage.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { Constants } from '../common/constants';
import { GlobalsService } from '../common/service/globals.service';

@Component({
	selector: 'app-more',
	templateUrl: './more.component.html',
	styleUrls: ['./more.component.css']
})
export class MoreComponent {

	private userEmail: string;
	private showProfile: boolean;

	constructor(private utils: Utils, private storage: StorageService, private alertHelper: AlertHelper, private globals: GlobalsService) {
		this.userEmail = this.storage.getDataForKey(Constants.USER_PROFILE).email;
		this.showProfile = this.storage.getDataForKey(Constants.ROLE_ID) === Constants.ROLE_USER;
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
