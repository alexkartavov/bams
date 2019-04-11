import { Injectable } from '@angular/core';
import { TabsNavModel } from '../models/tabs.nav';

@Injectable({
  providedIn: 'root'
})
export class TabsNavService {

  constructor() { }

  headingFromRoute(route: string): string {
      let hd: string = null;
      if (route && route.startsWith('/')) {
          route = route.substring(1);
      }
      TabsNavModel.tabs.forEach(tab => {
          if (tab.route === route) {
              hd = tab.heading;
          }
      });
      return hd;
  }

  routeFromHeading(heading: string): string {
      let rt: string = null;
      TabsNavModel.tabs.forEach(tab => {
          if (tab.heading === heading) {
              rt = '/' + tab.route;
          }
      });
      return rt;
  }

  indexFromRoute(route: string): number {
      let i = -1;
      let j = 0;
      if (route && route.startsWith('/')) {
          route = route.substring(1);
      }
      TabsNavModel.tabs.forEach(tab => {
          if (tab.route === route) {
              i = j;
          }
          j++;
      });
      return i;
  }

  headingFromIndex(i: number): string {
    if (i < 0 || i >= TabsNavModel.tabs.length) {
      return null;
    }
    return TabsNavModel.tabs[i].heading;
  }

  routeFromIndex(i: number): string {
    if (i < 0 || i >= TabsNavModel.tabs.length) {
      return null;
    }
    return '/' + TabsNavModel.tabs[i].route;
  }
}
