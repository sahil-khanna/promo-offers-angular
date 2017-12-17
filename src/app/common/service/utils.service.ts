import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

    public showLoading: Boolean = false;

    showLoadingIndicator(value: Boolean, message?: string) {
        this.showLoading = value;
    }
}
