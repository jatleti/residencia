import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDomainModule } from '@workspace/admin/domain';
import { RouterModule } from '@angular/router';
import { noutlyFeatureAdminRoutes } from './lib.routes';
import {
    FilterComponent,
    H1Component,
    MenuComponent,
    ModelButtonsComponent,
    StatusActiveComponent,
} from '@workspace/shared/ui-components';
import { UsersComponent } from './pages/users/users.component';
import { CardModule } from 'primeng/card';
import { SharedUtilCoreModule } from '@workspace/shared/util-core';
import { TableModule } from 'primeng/table';
import { UserComponent } from './pages/user/user.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { DropdownModule } from 'primeng/dropdown';
import { RolesComponent } from './pages/settings/roles/roles.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RoleComponent } from './pages/settings/role/role.component';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { EditRolesComponent } from './components/edit-roles/edit-roles.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';

@NgModule({
    imports: [
        CommonModule,
        AdminDomainModule,
        RouterModule.forChild(noutlyFeatureAdminRoutes),
        H1Component,
        CardModule,
        FilterComponent,
        SharedUtilCoreModule,
        TableModule,
        FormsModule,
        ModelButtonsComponent,
        InputTextModule,
        MenuComponent,
        DropdownModule,
        AccordionModule,
        CheckboxModule,
        EditRolesComponent,
        ButtonModule,
        RippleModule,
        EditorModule,
        FileUploadModule,
        SelectModule,
        StatusActiveComponent,
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        UserComponent,
        DashboardComponent,
        LayoutComponent,
        RolesComponent,
        SettingsComponent,
        RoleComponent,
    ],
    exports: [AdminComponent],
})
export class AdminFeatureAdminModule {}
