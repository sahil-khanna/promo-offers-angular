import { Component, OnDestroy } from '@angular/core';
import { Utils } from '../common/service/utils.service';
import { StorageService } from '../common/service/storage.service';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnDestroy {

  private userEmail: string;

  constructor(private utils: Utils, private storage: StorageService) {
    this.userEmail = this.storage.getDataForKey(Constants.USER_PROFILE).email;
  }

  ngOnDestroy() {
    alert('destroyed');
  }

}
