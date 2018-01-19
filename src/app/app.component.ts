import { Component } from '@angular/core';
import { GlobalsService } from './common/service/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private globals: GlobalsService
    ) { }
}
