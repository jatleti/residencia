import { Component, inject, OnInit, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    PermissionsComponent,
    GuardianFacade,
    Config,
    Guardian,
    ComboValues,
    Endpoints,
} from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileBeforeUploadEvent } from 'primeng/fileupload';
import { Observable, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
    selector: 'admin-guardian',
    standalone: false,
    templateUrl: './guardian.component.html',
    styleUrl: './guardian.component.scss',
})
export class GuardianComponent extends PermissionsComponent implements OnInit {
    ref: DynamicDialogRef;
    config: DynamicDialogConfig;

    constructor(@Optional() ref: DynamicDialogRef, @Optional() config: DynamicDialogConfig) {
        super();
        this.ref = ref;
        this.config = config;
    }

    facade = inject(GuardianFacade);
    router = inject(Router);
    location = inject(Location);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    activatedRoute = inject(ActivatedRoute);

    url = Config.baseUrl + '/guardians';
    filter = '';
    param = 'id_guardian';
    id = '';
    studentId = '';

    originalItem: Guardian = <Guardian>{};

    item$: Observable<Guardian> = this.facade.guardianSubject$;
    item: Guardian = <Guardian>{};
    loading$: Observable<boolean> = this.facade.loadingSubject$;
    loading = false;

    requiredFields: string[] = ['name'];

    comboYesNo = ComboValues.YES_NO;

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    signedPhoto = '';
    tabIndex = 0;

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
    }

    init() {
        if (this.config && this.config.data.guardianId) {
            this.id = this.config.data.guardianId;
        }
        if (this.config && this.config.data.studentId) {
            this.studentId = this.config.data.studentId;
        }
        this.facade.get(this.id);
    }

    back() {
        this.location.back();
    }

    add() {
        let error = false;
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Guardian];
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
        if (this.studentId && this.studentId !== '') {
            this.facade.add(this.item, this.studentId);
            this.closeDialog();
        }
    }

    save() {
        let error = false;
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Guardian];
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
        this.facade.set(this.item, this.studentId);
        this.closeDialog();
    }

    del() {
        this.confirmationService.confirm({
            message: '¿Seguro que deseas eliminarlo?',
            accept: () => {
                this.facade.del(this.item, this.studentId);
                this.closeDialog();
            },
        });
    }

    getStudent(id: string) {
        if (this.router) {
            this.router.navigate([Config.baseUrl, 'students', id]);
        }
    }

    closeDialog() {
        if (this.ref) {
            this.ref.close();
            return;
        }
    }
}
