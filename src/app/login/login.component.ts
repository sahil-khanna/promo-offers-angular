import { Component, OnInit, NgModule } from '@angular/core';
import { WebServiceService } from '../common/service/web-service/web-service.service';
import { error } from 'selenium-webdriver';
import { EmailValidator } from '@angular/forms';

@NgModule({
  imports: [
    EmailValidator
  ]
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: String;

  constructor(private webservice: WebServiceService) { }

  ngOnInit() {
  }

  login() {
    debugger;
    this.webservice.execute({
      method: this.webservice.METHOD_LOGIN,
      body: {
        email: this.email,
        password: this.password
      }
    });
  }

}
