import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    PermissionsComponent,
    StudentFacade,
    Config,
    Student,
    ComboValues,
    Endpoints,
} from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileBeforeUploadEvent } from 'primeng/fileupload';
import { Observable, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'admin-student',
    standalone: false,
    templateUrl: './student.component.html',
    styleUrl: './student.component.scss',
})
export class StudentComponent extends PermissionsComponent implements OnInit {
    facade = inject(StudentFacade);
    router = inject(Router);
    location = inject(Location);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    activatedRoute = inject(ActivatedRoute);

    url = Config.baseUrl + '/students';
    filter = '';
    param = 'id_student';
    id = '';

    originalItem: Student = <Student>{};

    item$: Observable<Student> = this.facade.studentSubject$;
    item: Student = <Student>{};
    loading$: Observable<boolean> = this.facade.loadingSubject$;
    loading = false;

    requiredFields: string[] = ['name', 'email'];

    comboYesNo = ComboValues.YES_NO;

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    blocks = ComboValues.BLOCKS;
    rooms = ComboValues.ROOM;
    floors = ComboValues.FLOOR;
    beds = ComboValues.BED;

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
                if (this.item.birthdate) this.item.birthdate = new Date(this.item.birthdate);
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
            const value = this.item[field as keyof Student];
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
            const value = this.item[field as keyof Student];
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

    onUpload(event: any) {
        this.item.photo = event.originalEvent.body.file;
        this.signedPhoto = event.originalEvent.body.signedFile;
    }

    onBeforeUpload($event: FileBeforeUploadEvent) {
        $event.formData.append('path', 'students');
    }
}
