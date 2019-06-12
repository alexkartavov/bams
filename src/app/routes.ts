import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsNavModel } from './models/tabs.nav';
import { AuthGuard } from './_guards/auth.guard';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { Role } from './models/role';

export const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        runGuardsAndResolvers: 'always',
    },
    {
        path: TabsNavModel.tabs[0].route,
        component: TabsComponent,
        data: { roles: [ Role.Admin, Role.User ] },
        canActivate: [ AuthGuard ]
    },
    {
        path: TabsNavModel.tabs[1].route,
        component: TabsComponent,
        data: { roles: [ Role.Admin ] },
        canActivate: [ AuthGuard ]
    },
    {
        path: TabsNavModel.tabs[2].route,
        component: TabsComponent,
        data: { roles: [ Role.Admin, Role.User ] },
        canActivate: [ AuthGuard ]
    },
    {
        path: TabsNavModel.tabs[3].route,
        component: TabsComponent,
        data: { roles: [ Role.Admin, Role.User ] },
        canActivate: [ AuthGuard ]
    },
    {
        path: TabsNavModel.tabs[4].route,
        component: TabsComponent,
        data: { roles: [ Role.Admin, Role.User ] },
        canActivate: [ AuthGuard ]
    },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
