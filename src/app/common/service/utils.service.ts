import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

    public showLoading: Boolean = false;

    public showLoadingIndicator(value: Boolean, message?: string) {
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
