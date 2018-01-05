import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

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
}
