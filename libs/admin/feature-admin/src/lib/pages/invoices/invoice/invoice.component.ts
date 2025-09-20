import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    PermissionsComponent,
    InvoiceFacade,
    Config,
    Invoice,
    ComboValues,
    Endpoints,
    Student,
    StudentFacade,
} from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-invoice',
    standalone: false,
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.scss',
})
export class InvoiceComponent extends PermissionsComponent implements OnInit {
    facade = inject(InvoiceFacade);
    router = inject(Router);
    location = inject(Location);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    activatedRoute = inject(ActivatedRoute);
    studentFacade = inject(StudentFacade);

    url = Config.baseUrl + '/invoices';
    filter = '';
    param = 'id_invoice';
    id = '';

    originalItem: Invoice = <Invoice>{};

    item$: Observable<Invoice> = this.facade.invoiceSubject$;
    item: Invoice = <Invoice>{};
    loading$: Observable<boolean> = this.facade.loadingSubject$;
    loading = false;

    students$: Observable<Student[]> = this.studentFacade.studentsSubject$;
    students: Student[] = [];

    requiredFields: string[] = ['code', 'amount', 'studentId'];

    comboYesNo = ComboValues.YES_NO;

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    signedFile = '';

    ngOnInit() {
        this.activatedRoute.params.subscribe((routeParams: any) => {
            if (routeParams[this.param]) {
                this.id = routeParams[this.param];
                if (!this.id) this.id = '';
            }
            this.init();
        });
        this.item$.pipe(takeUntil(this.destroy$)).subscribe((item) => {
            if (item) {
                this.item = item;
                this.originalItem = JSON.parse(JSON.stringify(item));
            }
        });
        this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
            this.loading = loading;
        });

        this.students$.pipe(takeUntil(this.destroy$)).subscribe((students) => {
            if (students) {
                this.students = students;
            }
        });
        if (this.isPermitted([this.Permissions.STUDENT.LIST])) {
            this.studentFacade.list();
        }
    }

    init() {
        this.facade.get(this.id);
    }

    back() {
        this.location.back();
    }

    add() {
        let error = false;
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Invoice];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + field,
                });
                error = true;
                return;
            }
        });
        if (error) return;
        this.facade.add(this.item);
    }

    save() {
        let error = false;
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Invoice];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + field,
                });
                error = true;
                return;
            }
        });
        if (error) return;
        this.facade.set(this.item);
    }

    del() {
        this.confirmationService.confirm({
            message: '¿Seguro que deseas eliminarlo?',
            accept: () => {
                this.facade.del(this.item);
            },
        });
    }
}
