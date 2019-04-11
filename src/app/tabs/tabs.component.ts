import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { TabsNavService } from '../_services/tabs.nav.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private router: Router, public tabsNav: TabsNavService) { }

  ngOnInit() {
    const i = this.tabsNav.indexFromRoute(this.router.url);
    if (i >= 0) {
      this.selectTab(i);
    }
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  onSelect(data: TabDirective): void {
    if (!data.heading) {
      return;
    }
    let rt: string = null;
    data.tabset.tabs.forEach(tab => {
      if (tab.heading === data.heading) {
        rt = this.tabsNav.routeFromHeading(data.heading);
      }
    });
    if (rt !== null) {
      this.router.navigate([rt]);
    }
  }
}
