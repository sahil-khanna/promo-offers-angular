import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';
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
    private alertHelper: AlertHelper
  ) { }

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
      callback: function(resp) {
        // if (resp.code !== 0) {
          $this.alertHelper.push({
            text: resp.message,
            type: 'error'
          });
        // }
      }
    });
  }

}
