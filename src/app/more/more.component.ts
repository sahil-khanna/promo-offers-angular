import { Component } from '@angular/core';
import { Utils } from '../common/service/utils.service';
import { StorageService } from '../common/service/storage.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent {

  private userEmail: string;

  constructor(private utils: Utils, private storage: StorageService, private alertHelper: AlertHelper) {
    this.userEmail = this.storage.getDataForKey(Constants.USER_PROFILE).email;
  }

  public logout() {
    const $this = this;
    this.alertHelper.push({
      title: 'Logout',
      text: 'Are you sure you want to logout from app?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      onConfirm: function() {
        $this.utils.logout();
      }
    });
  }

}
