import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { StorageService } from '../common/service/storage.service';
import { Router } from '@angular/router';
import { Constants } from '../common/constants';
import { GlobalsService } from '../common/service/globals.service';

@Component({
    selector: 'app-my-contributions',
    templateUrl: './my-contributions.component.html',
    styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent implements OnInit {

    constructor(
        private webservice: WebServiceService,
        private alertHelper: AlertHelper,
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

    ngOnInit() {
        // this.webservice.execute({
        //     method: 'contributions',
        //     loadingMessage: '',
        //     priority: 'high',
        //     callback: function (resp) {

        //     }
        // });
    }

}
