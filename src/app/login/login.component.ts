import { Component, OnInit, NgModule } from '@angular/core';
import { WebServiceService } from '../common/service/web-service/web-service.service';
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
    this.webservice.execute({
      method: this.webservice.METHOD_LOGIN,
      body: {
        email: this.email,
        password: this.password,
      },
      priority: 'high'
    }).subscribe(
      _response => {
        debugger;
      },
      _error => {
        debugger;
      }
    );
  }

}
