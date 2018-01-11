import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../common/service/storage.service';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';
import { Utils } from '../common/service/utils.service';
import { Constants } from '../common/constants';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public mobile: FormControl = new FormControl();
    public firstName: FormControl = new FormControl();
    public lastName: FormControl = new FormControl();
    public gender: FormControl = new FormControl();

    public email: string;

    public form = new FormGroup({
        mobile: this.mobile,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender
    });

    constructor(
        private storage: StorageService,
        private webservice: WebServiceService,
        private alertHelper: AlertHelper,
        private utils: Utils
    ) { }

    ngOnInit() {
        this.fillData();
    }

    private fillData() {
        const profile: any = this.storage.getDataForKey(Constants.USER_PROFILE);
        this.mobile.setValue(profile.mobile);
        this.firstName.setValue(profile.firstName);
        this.lastName.setValue(profile.lastName);
        this.gender.setValue((profile.gender === true) ? '1' : '2');
        this.email = profile.email;
    }

    public update() {
        if (!this.form.dirty) {
            this.alertHelper.push({
                text: 'Profile updated successfully',
                type: 'success'
            });
            return;
        }

        if (this.form.invalid) {
            this.mobile.markAsTouched();
            this.firstName.markAsTouched();
            this.lastName.markAsTouched();
            this.gender.markAsTouched();
            return;
        }

        const $this = this;
        this.webservice.execute({
            method: 'profile',
            body: {
                email: this.email,
                mobile: this.mobile.value,
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                gender: this.gender.value === '1'
            },
            loadingMessage: '',
            priority: 'high',
            callback: function (_response: any) {
                $this.alertHelper.push({
                    text: _response.message,
                    type: (_response.code === 0) ? 'success' : 'error'
                });

                if (_response.code === 0) {
                    $this.storage.setDataForKey(Constants.USER_PROFILE, {
                        email: this.email.value,
                        mobile: this.mobile.value,
                        firstName: this.firstName.value,
                        lastName: this.lastName.value,
                        gender: this.gender.value === '1'
                    });
                } else {
                    $this.fillData();   // Fill UI with old values
                }
            }
        });
    }

}
