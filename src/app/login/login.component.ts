import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { WebServiceService } from '../common/service/web-service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

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

  constructor(private webservice: WebServiceService, private router: Router) { }

  register() {
    this.router.navigate(['register']);
  }

  login() {
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
      priority: 'high',
      callback: function(resp) {
        debugger;
      }
    });
  }

}
