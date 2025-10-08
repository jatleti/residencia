import { Component, inject, OnInit } from '@angular/core';
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

@Component({
    selector: 'admin-guardian',
    standalone: false,
    templateUrl: './guardian.component.html',
    styleUrl: './guardian.component.scss',
})
export class GuardianComponent extends PermissionsComponent implements OnInit {
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
        this.facade.add(this.item);
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

    getStudent(id: string) {
        if (this.router) {
            this.router.navigate([Config.baseUrl, 'students', id]);
        }
    }
}
