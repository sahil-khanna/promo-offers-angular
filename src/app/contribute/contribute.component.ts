import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
    selector: 'app-contribute',
    templateUrl: './contribute.component.html',
    styleUrls: ['./contribute.component.css']
})
export class ContributeComponent {

    public type: FormControl = new FormControl();
    public cookedOn: FormControl = new FormControl();
    public canServe: FormControl = new FormControl();
    public isPacked: FormControl = new FormControl();
    public address: FormControl = new FormControl();
    public mobile: FormControl = new FormControl();

    public formGroup: FormGroup = new FormGroup({
        type: this.type,
        cookedOn: this.cookedOn,
        canServe: this.canServe,
        isPacked: this.isPacked,
        address: this.address,
        mobile: this.mobile
    });

    constructor(private webservice: WebServiceService, private alertHelper: AlertHelper) { }

    public submit() {
        if (!this.formGroup.valid) {
            this.type.markAsTouched();
            this.cookedOn.markAsTouched();
            this.canServe.markAsTouched();
            this.isPacked.markAsTouched();
            this.address.markAsTouched();
            this.mobile.markAsTouched();
            return;
        }

        const $this = this;
        this.webservice.execute({
            method: 'contribute',
            body: {
                type: this.type.value,
                cookedOn: this.cookedOn.value,
                canServe: this.canServe.value,
                isPacked: this.isPacked.value,
                address: this.address.value,
                mobile: this.mobile.value
            },
            loadingMessage: '',
            priority: 'high',
            callback: function(_response: any) {
                if (_response.code === 0) {
                    $this.formGroup.reset();
                }

                $this.alertHelper.push({
                    text: _response.message,
                    type: (_response.code === 0) ? 'success' : 'error'
                });
            }
        });
    }

}
