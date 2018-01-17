import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
    selector: 'app-my-contributions',
    templateUrl: './my-contributions.component.html',
    styleUrls: ['./my-contributions.component.css']
})
export class MyContributionsComponent implements OnInit {

    constructor(private webservice: WebServiceService, private alertHelper: AlertHelper) { }

    ngOnInit() {
        this.webservice.execute({
            method: 'contributions',
            loadingMessage: '',
            priority: 'high',
            callback: function (resp) {

            }
        });
    }

}
