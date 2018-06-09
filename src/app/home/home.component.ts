import { Component } from '@angular/core';
import { GlobalsService } from '../common/service/globals.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	constructor(
		private globals: GlobalsService
	) {}
}
