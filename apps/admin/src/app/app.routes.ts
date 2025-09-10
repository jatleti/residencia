import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { AuthGuardService } from '@workspace/shared/util-core';
import { MagicLinkComponent } from './pages/magic-link/magic-link.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: MainNavigationComponent,
        children: [
            {
                path: '',
                redirectTo: 'admin',
                pathMatch: 'full',
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'magic-link/:token',
                component: MagicLinkComponent,
            },
            {
                path: 'admin',
                loadChildren: () => import('@workspace/admin/feature-admin').then((m) => m.AdminFeatureAdminModule),
                canActivate: [AuthGuardService],
            },
        ],
    },
];
