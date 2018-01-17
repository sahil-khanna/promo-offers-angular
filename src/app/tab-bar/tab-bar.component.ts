import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

    @ViewChild('tabBar') tabBar: ElementRef;

    public tabItemWidth: String = '0';
    public tabItems: Array<{name: string, icon: string, class?: string, target: string}> = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.tabItems = [
            {
                name: 'My Contributions',
                icon: 'home',
                class: 'selected',
                target: 'my-contributions'
            },
            {
                name: 'Contribute',
                icon: 'location_searching',
                target: 'contribute'
            },
            {
                name: 'More',
                icon: 'more_horiz',
                target: 'more'
            }
        ];

        this.tabItemWidth = this.tabBar.nativeElement.offsetWidth / this.tabItems.length + 'px';
    }

    tabSelected(selectedIndex: number) {
        for (let i = 0; i < this.tabItems.length; i++) {
            delete this.tabItems[i].class;
        }

        const item = this.tabItems[selectedIndex];
        item.class = 'selected';
        this.router.navigate([item.target]);
    }
}
