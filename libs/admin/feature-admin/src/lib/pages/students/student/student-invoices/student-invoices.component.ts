import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
    ComboValues,
    Config,
    Invoice,
    InvoiceFacade,
    PermissionsComponent,
    Student,
} from '@workspace/shared/util-core';

@Component({
    selector: 'admin-student-invoices',
    standalone: false,
    templateUrl: './student-invoices.component.html',
    styleUrl: './student-invoices.component.scss',
})
export class StudentInvoicesComponent extends PermissionsComponent {
    @Input() student!: Student;

    router = inject(Router);
    invoiceFacade = inject(InvoiceFacade);
    invoiceSelected: Invoice | null = null;

    showInvoice = false;
    saving = false;

    comboYesNo = ComboValues.YES_NO;

    get(invoice: Invoice) {
        // if (this.router) {
        //     this.router.navigate([Config.baseUrl, 'invoices', id]);
        // }
        this.invoiceSelected = invoice;
        this.showInvoice = true;
    }

    async set() {
        if (this.isPermitted([this.Permissions.INVOICE.EDIT])) {
            if (this.invoiceSelected) {
                this.saving = true;
                await this.invoiceFacade.set(this.invoiceSelected);
                this.saving = false;
                this.showInvoice = false;
                this.invoiceSelected = null;
            }
        }
    }
}
