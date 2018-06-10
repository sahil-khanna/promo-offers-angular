import { Component , AfterViewInit} from '@angular/core';
import { ConstantsService } from '../common/service/constants.service';
import { StorageService } from '../common/service/storage.service';
import { GlobalsService } from '../common/service/globals.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

	private selectedTabId: Number;
	private homeLoaded: Boolean = false;

	constructor(
		private constants: ConstantsService,
		private storage: StorageService,
		private globals: GlobalsService
	) { }

	ngAfterViewInit() {
		setTimeout(() => {
			this.homeLoaded = true;
		}, 0);
	}
}
