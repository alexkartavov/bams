import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsNavModel } from './models/tabs.nav';
import { AuthGuard } from './_guards/auth.guard';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: TabsNavModel.tabs[0].route, component: TabsComponent },
            { path: TabsNavModel.tabs[1].route, component: TabsComponent },
            { path: TabsNavModel.tabs[2].route, component: TabsComponent },
            { path: TabsNavModel.tabs[3].route, component: TabsComponent },
            { path: TabsNavModel.tabs[4].route, component: TabsComponent }
        ]
    },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
