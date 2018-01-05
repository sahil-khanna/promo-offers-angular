import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertHelper } from '../common/service/alert-helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  public email: FormControl = new FormControl();
  public password: FormControl = new FormControl();
  public form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private webservice: WebServiceService,
    private alertHelper: AlertHelper
  ) { }

  public login() {
    if (this.form.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    const $this = this;
    this.webservice.execute({
      method: 'login',
      body: {
        email: this.email.value,
        password: this.password.value,
      },
      loadingMessage: '',
      priority: 'high',
      callback: function(_response) {
        $this.alertHelper.push({
          text: _response.message,
          type: (_response.code === 0) ? 'success' : 'error'
        });
      }
    });
  }

}
