import { Component } from '@angular/core';
import { WebServiceService } from '../common/service/web-service/web-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public email: FormControl = new FormControl();
  public password: FormControl = new FormControl();
  public confirmPassword: FormControl = new FormControl();
  public mobile: FormControl = new FormControl();
  public firstName: FormControl = new FormControl();
  public lastName: FormControl = new FormControl();
  public gender: FormControl = new FormControl();

  public form = new FormGroup({
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
    mobile: this.mobile,
    firstName: this.firstName,
    lastName: this.lastName,
    gender: this.gender
  });

  constructor(private webservice: WebServiceService, private router: Router) { }

  login() {
    this.router.navigate(['register']);
  }

  register() {
    if (this.form.invalid || this.password.value !== this.confirmPassword.value) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.confirmPassword.markAsTouched();
      this.mobile.markAsTouched();
      this.firstName.markAsTouched();
      this.lastName.markAsTouched();
      this.gender.markAsTouched();
      return;
    }

    const $this = this;
    this.webservice.execute({
      method: 'register',
      body: {
        email: this.email.value,
        password: this.password.value,
        mobile: this.mobile.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        gender: this.gender.value === '1'
      },
      priority: 'high',
      callback: function(resp) {
        debugger;
      }
    });
  }
}
