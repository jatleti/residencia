import { Route } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleGuardService, Permissions, PermissionGuardService } from '@workspace/shared/util-core';
import { LayoutComponent } from './layout/layout.component';
import { RolesComponent } from './pages/settings/roles/roles.component';
import { RoleComponent } from './pages/settings/role/role.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StudentsComponent } from './pages/students/students.component';
import { StudentComponent } from './pages/students/student/student.component';
import { GuardiansComponent } from './pages/guardians/guardians.component';
import { GuardianComponent } from './pages/guardians/guardian/guardian.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceComponent } from './pages/invoices/invoice/invoice.component';
import { StudentsStatusComponent } from './pages/students-status/students-status.component';
import { KioskComponent } from './pages/kiosk/kiosk.component';

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
                path: 'kiosk',
                pathMatch: 'full',
                component: KioskComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.KIOSK.VIEW],
                },
            },
            {
                path: 'students-status',
                component: StudentsStatusComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.STUDENT.LIST],
                },
            },
            {
                path: 'students',
                component: StudentsComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.STUDENT.VIEW],
                },
            },
            {
                path: 'students/:id_student',
                component: StudentComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.STUDENT.VIEW],
                },
            },
            {
                path: 'guardians',
                component: GuardiansComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.GUARDIAN.VIEW],
                },
            },
            {
                path: 'guardians/:id_guardian',
                component: GuardianComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.GUARDIAN.VIEW],
                },
            },
            {
                path: 'invoices',
                component: InvoicesComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.INVOICE.VIEW],
                },
            },
            {
                path: 'invoices/:id_invoice',
                component: InvoiceComponent,
                canActivate: [PermissionGuardService],
                data: {
                    expectedPermission: [Permissions.INVOICE.VIEW],
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
