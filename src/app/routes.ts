import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsNavModel } from './models/tabs.nav';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: TabsNavModel.tabs[0].route, component: TabsComponent},
    { path: TabsNavModel.tabs[1].route, component: TabsComponent, },
    { path: TabsNavModel.tabs[2].route, component: TabsComponent },
    { path: TabsNavModel.tabs[3].route, component: TabsComponent },
    { path: TabsNavModel.tabs[4].route, component: TabsComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
