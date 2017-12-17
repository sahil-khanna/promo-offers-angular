import { Component, NgModule } from '@angular/core';
import { Router} from '@angular/router';
import { Utils } from './common/service/utils.service';

@NgModule({
  imports: [
    Router
  ]
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private utils: Utils) {
    this.router.navigate(['login']);
  }

}
