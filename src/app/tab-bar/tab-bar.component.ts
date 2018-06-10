import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../common/service/storage.service';
import { ConstantsService } from '../common/service/constants.service';
import { GlobalsService } from '../common/service/globals.service';

@Component({
	selector: 'app-tab-bar',
	templateUrl: './tab-bar.component.html',
	styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

	@ViewChild('tabBar') tabBar: ElementRef;

	public tabItemWidth: String = '0';
	public tabItems: Array<{ name: String, icon: String, class?: String, target: String, id: Number }> = [];

	constructor(
		private router: Router,
		private storage: StorageService,
		private constants: ConstantsService,
		private globals: GlobalsService
	) {
		console.log('Tabbar Constructor');
	}

	ngOnInit() {
		const roleId = this.storage.getDataForKey(this.constants.ROLE_ID);
		switch (roleId) {
			case this.constants.ROLE_ADMIN: {
				this.tabItems = [
					{
						name: 'Vendors',
						icon: 'shopping_basket',
						target: 'vendors',
						id: this.constants.TAB_VENDORS
					},
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more',
						id: this.constants.TAB_MORE
					}
				];
				break;
			}
			case this.constants.ROLE_VENDOR: {
				this.tabItems = [
					{
						name: 'Offers',
						icon: 'local_offer',
						target: 'offers',
						id: this.constants.TAB_OFFERS
					},
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more',
						id: this.constants.TAB_MORE
					}
				];
				break;
			}
			case this.constants.ROLE_USER: {
				this.tabItems = [
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more',
						id: this.constants.TAB_MORE
					}
				];
				break;
			}
		}

		// Select the first tab item
		const tabItem = this.tabItems[0];
		tabItem['class'] = 'selected';
		this.globals.selectedTabId = tabItem.id;

		console.log('TabBar: selectedTabItem: ' + this.globals.selectedTabId);

		this.tabItemWidth = this.tabBar.nativeElement.offsetWidth / this.tabItems.length + 'px';
	}

	private tabSelected(selectedIndex: number) {
		for (let i = 0; i < this.tabItems.length; i++) {
			delete this.tabItems[i].class;
		}

		const item = this.tabItems[selectedIndex];
		item.class = 'selected';
		this.globals.selectedTabId = item.id;
	}
}
