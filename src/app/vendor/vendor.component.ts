import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { Constants } from '../common/constants';

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.css']
})
export class VendorComponent {

    private name: FormControl = new FormControl();
    private description: FormControl = new FormControl();
    private website: FormControl = new FormControl();
    private email: FormControl = new FormControl();
    private imageURL: string = Constants.IMAGE_PLACEHOLDER;
    private existingVendor: any = null;


    private form = new FormGroup({
        name: this.name,
        description: this.description,
        email: this.email,
        website: this.website
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private webservice: WebServiceService,
        private alertHelper: AlertHelper
    ) {
        const $this = this;
        this.activatedRoute.queryParams.subscribe((params: any) => {
            if (JSON.stringify(params).length > 2) {
                $this.existingVendor = params;
                $this.name.disable();
                $this.fillData();
            }
        });
    }

    private fillData() {
        this.name.setValue(this.existingVendor.name);
        this.description.setValue(this.existingVendor.description);
        this.imageURL = this.existingVendor.imageURL ? this.existingVendor.imageURL : Constants.IMAGE_PLACEHOLDER;
    }

    /*
     *  Update profile only is the form is not Pristine
     */
    public submit() {
        if (this.form.invalid) {
            this.name.markAsTouched();
            this.description.markAsTouched();
            this.website.markAsTouched();
            this.email.markAsTouched();
            return;
        }

        if (!this.form.dirty && this.imageURL.search('data:image') === -1) {
            this.alertHelper.push({
                text: 'Information updated successfully',
                type: 'success'
            });
            return;
        }

        const $this = this;

        const body: any = {
            name: this.name.value,
            description: this.description.value,
            website: this.website.value,
            email: this.email.value,
            image: (this.imageURL.search('data:image') === -1) ? null : this.imageURL
        };
        let method = null;

        if (this.existingVendor) {
            body.id = this.existingVendor.id;
            method = 'update-vendor';
        } else {
            method = 'create-vendor';
        }

        this.webservice.execute({
            method: method,
            body: body,
            loadingMessage: '',
            priority: 'high',
            callback: function (_response: any) {
                $this.alertHelper.push({
                    text: _response.message,
                    type: (_response.code === 0) ? 'success' : 'error'
                });

                if (_response.code === 0) {
                    if (_response.data.imageURL) {
                        $this.imageURL = _response.data.imageURL;
                    }

                    $this.form.markAsPristine();
                } else {
                    $this.fillData();   // Fill UI with old values
                }
            }
        });
    }

    public imageSelected(event) {
        const $this = this;

        const fileReader = new FileReader();
        fileReader.onload = function(e: any) {
            $this.imageURL = e.target.result;
        };

        fileReader.readAsDataURL(event.target.files[0]);
    }

}
