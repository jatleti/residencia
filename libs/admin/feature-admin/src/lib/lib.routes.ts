import { Route } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleGuardService, Permissions, PermissionGuardService } from '@workspace/shared/util-core';
import { LayoutComponent } from './layout/layout.component';
import { RolesComponent } from './pages/settings/roles/roles.component';
import { RoleComponent } from './pages/settings/role/role.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const noutlyFeatureAdminRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                pathMatch: 'full',
                component: DashboardComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.DASHBOARD.VIEW],
                },
            },

            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.SETTINGS.VIEW],
                },
                children: [
                    { path: '', redirectTo: 'users', pathMatch: 'full' },
                    {
                        path: 'users',
                        component: UsersComponent,
                        canActivate: [PermissionGuardService],
                        data: {
                            expectedPermission: [Permissions.USER.VIEW],
                        },
                    },
                    {
                        path: 'users/:id_user',
                        component: UserComponent,
                        canActivate: [PermissionGuardService],
                        data: {
                            expectedPermission: [Permissions.USER.VIEW],
                        },
                    },
                    {
                        path: 'roles',
                        component: RolesComponent,
                        canActivate: [PermissionGuardService],
                        data: {
                            expectedPermission: [Permissions.SETTINGS.ROLES.VIEW],
                        },
                    },
                    {
                        path: 'roles/:id_role',
                        component: RoleComponent,
                        canActivate: [PermissionGuardService],
                        data: {
                            expectedPermission: [Permissions.SETTINGS.ROLES.VIEW],
                        },
                    },
                ],
            },
        ],
    },
];
