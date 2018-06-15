import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../common/service/storage.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-tab-bar',
	templateUrl: './tab-bar.component.html',
	styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

	@ViewChild('tabBar') tabBar: ElementRef;
	@Output() tabChanged = new EventEmitter<Number>();

	public tabItemWidth: String = '0';
	public tabItems: Array<{ name: String, icon: String, class?: String, target: String, id: Number }> = [];
	private selectedTabIndex: Number;

	constructor(
		private storage: StorageService,
		private constants: ConstantsService,
	) { }

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
		this.tabSelected(0);

		this.tabItemWidth = this.tabBar.nativeElement.offsetWidth / this.tabItems.length + 'px';
	}

	private tabSelected(tabIndex: number) {
		if (tabIndex === this.selectedTabIndex) {
			return;
		}

		this.selectedTabIndex = tabIndex;

		for (let i = 0; i < this.tabItems.length; i++) {
			delete this.tabItems[i].class;
		}

		const item = this.tabItems[tabIndex];
		item.class = 'selected';
		this.tabChanged.emit(item.id);
	}
}
