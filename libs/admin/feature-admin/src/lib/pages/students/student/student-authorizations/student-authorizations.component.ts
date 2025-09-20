import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Student, StudentFacade, Authorization, ComboValues } from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-student-authorizations',
    standalone: false,
    templateUrl: './student-authorizations.component.html',
    styleUrl: './student-authorizations.component.scss',
})
export class StudentAuthorizationsComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newAuthorization: Authorization = <Authorization>{};
    showAddAuthorization = false;
    saving = false;

    router = inject(Router);

    comboYesNo = ComboValues.YES_NO;

    ngOnInit() {
        this.newAuthorization = <Authorization>{};
        this.newAuthorization.date = new Date();
    }

    addAuthorization() {
        this.newAuthorization = <Authorization>{};
        this.newAuthorization.date = new Date();
        this.showAddAuthorization = true;
    }

    editAuthorization(authorization: Authorization) {
        this.newAuthorization = { ...authorization };
        if (this.newAuthorization.date) {
            this.newAuthorization.date = new Date(this.newAuthorization.date);
        }
        if (this.newAuthorization.from) {
            this.newAuthorization.from = new Date(this.newAuthorization.from);
        }
        if (this.newAuthorization.to) {
            this.newAuthorization.to = new Date(this.newAuthorization.to);
        }
        this.showAddAuthorization = true;
    }

    async saveAuthorization() {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        if (!this.newAuthorization.date) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una fecha a la autorización',
            });
            return;
        }
        if (!this.newAuthorization.content) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner un contenido a la autorización',
            });
            return;
        }
        if (!this.newAuthorization.name || this.newAuthorization.name.trim() === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una descripción a la autorización',
            });
            return;
        }

        this.newAuthorization.studentId = this.student.id;

        this.saving = true;
        if (this.newAuthorization.id) {
            await this.studentFacade.setAuthorization(this.student.id, this.newAuthorization);
        } else {
            await this.studentFacade.addAuthorization(this.student.id, this.newAuthorization);
        }
        this.saving = false;
        this.student.Authorizations = await this.studentFacade.listAuthorizations(this.student.id);
        this.newAuthorization = <Authorization>{};
        this.showAddAuthorization = false;
    }

    async delAuthorization(authorization: Authorization) {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar esta autorización?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentFacade.delAuthorization(this.student.id, authorization.id);
                this.student.Authorizations = await this.studentFacade.listAuthorizations(this.student.id);
                this.showAddAuthorization = false;
            },
        });
    }

    isNextAuthorization(authorization: Authorization): boolean {
        if (authorization.to) {
            const now = new Date();
            const to = new Date(authorization.to);
            return to >= now;
        }
        return false;
    }
}
