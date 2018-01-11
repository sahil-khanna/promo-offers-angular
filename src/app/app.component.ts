import { Component } from '@angular/core';
import { Utils } from './common/service/utils.service';
import { StorageService } from './common/service/storage.service';
import { GlobalsService } from './common/service/globals.service';
import { Constants } from './common/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private storage: StorageService,
        private router: Router,
        private globals: GlobalsService
    ) {
        if (!this.storage.getDataForKey(Constants.TOKEN)) {
            this.router.navigate(['login']);
        } else {
            this.globals.token = this.storage.getDataForKey(Constants.TOKEN);
        }
    }
}
