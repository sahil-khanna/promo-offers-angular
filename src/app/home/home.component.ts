import { Component , AfterViewInit} from '@angular/core';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

	private selectedTabIndex: Number;
	private homeLoaded: Boolean = false;

	constructor(
		private constants: ConstantsService
	) { }

	ngAfterViewInit() {
		setTimeout(() => {
			this.homeLoaded = true;
		}, 0);
	}

	onTabChanged(tabIndex: Number) {
		this.selectedTabIndex = tabIndex;
	}
}
