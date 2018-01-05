import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { WebServiceService } from '../common/service/web-service.service';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  private email: string;
  private passwordKey: string;
  public password: FormControl = new FormControl();
  public confirmPassword: FormControl = new FormControl();

  public form = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword
  });
  // TODO: If Logged In, pick user's email. Send Token with new password to reset
  // TODO: If reset password key is sent in query string, pick user's email from it. Send password key with new password to reset
  constructor(
    private activatedRoute: ActivatedRoute,
    private webservice: WebServiceService,
    private alertHelper: AlertHelper
  ) {
    const $this = this;
    this.activatedRoute.queryParams.subscribe((params: any) => {
      $this.email = params.email;
      $this.passwordKey = params.passwordKey;
    });
  }

  public submit() {
    if (this.form.invalid || this.password.value !== this.confirmPassword.value) {
      this.password.markAsTouched();
      this.confirmPassword.markAsTouched();
      return;
    }

    // TODO: Send token if already logged in
    const $this = this;
    this.webservice.execute({
      method: 'reset-password',
      body: {
        password: this.password.value,
        email: this.email,
        passwordKey: this.passwordKey
      },
      loadingMessage: '',
      priority: 'high',
      callback: function(_response: any) {
        $this.alertHelper.push({
          text: _response.message,
          type: (_response.code === 0) ? 'success' : 'error'
        });
      }
    });
  }
}