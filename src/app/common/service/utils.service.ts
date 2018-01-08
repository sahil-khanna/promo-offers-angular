import { Injectable } from '@angular/core';
import { AlertHelper } from './alert-helper.service';
import { StorageService } from './storage.service';
import { WebServiceService } from './web-service.service';
import { Constants } from '../constants';

@Injectable()
export class Utils {

    constructor(
        private alertHelper: AlertHelper,
        private storage: StorageService,
        private webservice: WebServiceService
    ) {}

    public showLoading: boolean;

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

    public logout() {
        // TODO: Redirect to login screen

        this.webservice.clear();
        this.webservice.execute({
            method: 'logout',
            priority: 'high',
            urlParams: {token: this.storage.getDataForKey(Constants.TOKEN)},
            callback: function(){}
        });

        this.storage.clearData();
    }
}
