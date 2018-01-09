import { Injectable, Injector } from '@angular/core';
import { Location } from '@angular/common';
import { AlertHelper } from './alert-helper.service';
import { StorageService } from './storage.service';
import { WebServiceService } from './web-service.service';
import { Constants } from '../constants';
import { Router } from '@angular/router';

@Injectable()
export class Utils {

    private alertHelper: AlertHelper;
    private storage: StorageService;
    private webservice: WebServiceService;

    public showLoading: boolean;

    constructor(private injector: Injector, private router: Router, private location: Location) {
        const $this = this;
        setTimeout(() => {
            $this.alertHelper = $this.injector.get(AlertHelper);
            $this.storage = $this.injector.get(StorageService);
            $this.webservice = $this.injector.get(WebServiceService);
        });
    }

    public showLoadingIndicator(value: boolean, message?: string) {
        this.showLoading = value;
    }

    public nullToObject(sourceType, targetType) {
        if (typeof sourceType === 'number' || typeof sourceType === 'boolean') {
            return sourceType;
        } else {
            return (sourceType == null) ? targetType : sourceType;
        }
    }

    public goBack() {
        this.location.back();
    }

    public logout() {
        this.webservice.clear();
        this.webservice.execute({
            method: 'logout',
            priority: 'high',
            callback: function () { }
        });

        this.storage.clearData();

        this.router.navigate(['login']);
    }
}
