import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

    public email: FormControl = new FormControl();
    public form = new FormGroup({
        email: this.email
    });

    constructor(
        private webservice: WebServiceService,
        private alertHelper: AlertHelper,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        const $this = this;
        this.activatedRoute.queryParams.subscribe((params: any) => {
            $this.email.setValue(params.email);
        });
    }

    public submit() {
        if (this.form.invalid) {
            this.email.markAsTouched();
            return;
        }

        const $this = this;
        this.webservice.execute({
            method: 'forgot-password',
            urlParams: {
                email: this.email.value
            },
            loadingMessage: '',
            priority: 'high',
            callback: function (_response) {
                $this.alertHelper.push({
                    text: _response.message,
                    type: (_response.code === 0) ? 'success' : 'error',
                    onConfirm: function () {
                        $this.router.navigate(['login']);
                    }
                });

                console.log(_response.data); // Print password reset URL on console
            }
        });
    }

}
