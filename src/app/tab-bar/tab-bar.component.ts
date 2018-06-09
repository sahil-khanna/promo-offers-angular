import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../common/service/storage.service';
import { ConstantsService } from '../common/service/constants.service';

@Component({
	selector: 'app-tab-bar',
	templateUrl: './tab-bar.component.html',
	styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

	@ViewChild('tabBar') tabBar: ElementRef;

	public tabItemWidth: String = '0';
	public tabItems: Array<{ name: string, icon: string, class?: string, target: string }> = [];

	constructor(
		private router: Router,
		private storage: StorageService,
		private constants: ConstantsService
	) { }

	ngOnInit() {
		const roleId = this.storage.getDataForKey(this.constants.ROLE_ID);

		switch (roleId) {
			case this.constants.ROLE_ADMIN: {
				this.tabItems = [
					{
						name: 'Vendors',
						icon: 'shopping_basket',
						class: 'selected',
						target: 'vendors'
					},
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more'
					}
				];
				break;
			}
			case roleId === this.constants.ROLE_VENDOR: {
				this.tabItems = [
					{
						name: 'Offers',
						icon: 'local_offer',
						class: 'selected',
						target: 'offers'
					},
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more'
					}
				];
				break;
			}
			case this.constants.ROLE_USER: {
				this.tabItems = [
					// {
					// 	name: 'My Contributions',
					// 	icon: 'home',
					// 	class: 'selected',
					// 	target: 'my-contributions'
					// },
					// {
					// 	name: 'Contribute',
					// 	icon: 'location_searching',
					// 	target: 'contribute'
					// },
					{
						name: 'More',
						icon: 'more_horiz',
						target: 'more'
					}
				];
				break;
			}
		}

		this.tabItemWidth = this.tabBar.nativeElement.offsetWidth / this.tabItems.length + 'px';
	}

	private tabSelected(selectedIndex: number) {
		for (let i = 0; i < this.tabItems.length; i++) {
			delete this.tabItems[i].class;
		}

		const item = this.tabItems[selectedIndex];
		item.class = 'selected';
		this.router.navigate([item.target]);
	}
}
