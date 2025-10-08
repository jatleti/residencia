import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    PermissionsComponent,
    StudentFacade,
    Config,
    Student,
    ComboValues,
    Endpoints,
    getAgeNumber,
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

    requiredFields: string[] = ['name', 'email', 'code'];
    requiredFieldsTranslations: string[] = ['nombre', 'email', 'código'];

    comboYesNo = ComboValues.YES_NO;

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    blocks = ComboValues.BLOCKS;
    rooms = ComboValues.ROOM;
    floors = ComboValues.FLOOR;
    beds = ComboValues.BED;
    courses = ComboValues.COURSE;
    turn = ComboValues.TURN;
    motives = ComboValues.MOTIVES;
    gender = ComboValues.GENDER;
    isNew = ComboValues.ISNEW;
    studies = ComboValues.STUDIES;

    getAgeNumber = getAgeNumber; // función para calcular la edad

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
                if (this.item.ingressedAt) this.item.ingressedAt = new Date(this.item.ingressedAt);
                if (this.item.inactiveAt) this.item.inactiveAt = new Date(this.item.inactiveAt);
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
        this.requiredFields.forEach((field, index) => {
            const value = this.item[field as keyof Student];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + this.requiredFieldsTranslations[index],
                });
                error = true;
                return;
            }
        });
        if (error) return;

        if (!this.validate()) return;

        this.facade.add(this.item);
    }

    save() {
        let error = false;
        this.requiredFields.forEach((field, index) => {
            const value = this.item[field as keyof Student];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + this.requiredFieldsTranslations[index],
                });
                error = true;
                return;
            }
        });
        if (error) return;

        if (!this.validate()) return;

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

    validate(): boolean {
        if (this.item.active === 0) {
            if (this.item.ingressed === 1 || this.item.admitted === 1) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Un alumno inactivo no puede estar ingresado o admitido si está inactivo',
                });
                return false;
            }
        } else {
            if (this.item.ingressed === 1 && this.item.admitted === 0) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Un alumno ingresado debe estar admitido',
                });
                return false;
            }
        }
        return true;
    }

    onUpload(event: any) {
        this.item.photo = event.originalEvent.body.file;
        this.signedPhoto = event.originalEvent.body.signedFile;
    }

    onBeforeUpload($event: FileBeforeUploadEvent) {
        $event.formData.append('path', 'students');
    }
}
