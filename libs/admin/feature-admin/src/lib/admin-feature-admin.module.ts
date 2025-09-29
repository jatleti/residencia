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
    AvatarComponent,
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
import { StudentsComponent } from './pages/students/students.component';
import { StudentComponent } from './pages/students/student/student.component';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import { GuardiansComponent } from './pages/guardians/guardians.component';
import { GuardianComponent } from './pages/guardians/guardian/guardian.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoiceComponent } from './pages/invoices/invoice/invoice.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { StudentInvoicesComponent } from './pages/students/student/student-invoices/student-invoices.component';
import { StudentGuardiansComponent } from './pages/students/student/student-guardians/student-guardians.component';
import { StudentTutorshipsComponent } from './pages/students/student/student-tutorships/student-tutorships.component';
import { StudentAttendancesComponent } from './pages/students/student/student-attendances/student-attendances.component';
import { StudentSanctionsComponent } from './pages/students/student/student-sanctions/student-sanctions.component';
import { DialogModule } from 'primeng/dialog';
import { StudentAuthorizationsComponent } from './pages/students/student/student-authorizations/student-authorizations.component';
import { StudentsStatusComponent } from './pages/students-status/students-status.component';
import { KioskComponent } from './pages/kiosk/kiosk.component';
import { StudentFilesComponent } from './pages/students/student/student-files/student-files.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { KioskDinnerComponent } from './pages/kiosk-dinner/kiosk-dinner.component';

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
        TabsModule,
        AvatarComponent,
        DatePickerModule,
        InputNumberModule,
        DialogModule,
        QRCodeComponent,
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
        StudentsComponent,
        StudentComponent,
        GuardiansComponent,
        GuardianComponent,
        InvoicesComponent,
        InvoiceComponent,
        StudentInvoicesComponent,
        StudentGuardiansComponent,
        StudentTutorshipsComponent,
        StudentAttendancesComponent,
        StudentSanctionsComponent,
        StudentAuthorizationsComponent,
        StudentsStatusComponent,
        KioskComponent,
        StudentFilesComponent,
        KioskDinnerComponent,
    ],
    exports: [AdminComponent],
})
export class AdminFeatureAdminModule {}
