import { Component } from '@angular/core';
import { Utils } from '../common/service/utils.service';
import { StorageService } from '../common/service/storage.service';
import { Constants } from '../common/constants';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    constructor(private utils: Utils, private storage: StorageService, private router: Router) {
        if (!this.storage.getDataForKey(Constants.TOKEN)) {
            this.router.navigate(['login']);
        }
    }
}
