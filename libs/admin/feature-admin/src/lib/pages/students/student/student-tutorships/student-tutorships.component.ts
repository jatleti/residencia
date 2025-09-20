import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student, Config, StudentFacade, Tutorship, PermissionsComponent } from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-student-tutorships',
    standalone: false,
    templateUrl: './student-tutorships.component.html',
    styleUrl: './student-tutorships.component.scss',
})
export class StudentTutorshipsComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newTutorship: Tutorship = <Tutorship>{};
    showAddTutorship = false;
    saving = false;

    router = inject(Router);

    ngOnInit() {
        this.newTutorship = <Tutorship>{};
        this.newTutorship.date = new Date();
    }

    addTutorship() {
        this.newTutorship = <Tutorship>{};
        this.newTutorship.date = new Date();
        this.showAddTutorship = true;
    }

    editTutorship(tutorship: Tutorship) {
        this.newTutorship = { ...tutorship };
        if (this.newTutorship.date) {
            this.newTutorship.date = new Date(this.newTutorship.date);
        }
        this.showAddTutorship = true;
    }

    async saveTutorship() {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        if (!this.newTutorship.date) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una fecha a la tutoría',
            });
            return;
        }
        if (!this.newTutorship.content) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner un contenido a la tutoría',
            });
            return;
        }
        if (!this.newTutorship.name || this.newTutorship.name.trim() === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una descripción a la tutoría',
            });
            return;
        }

        this.newTutorship.studentId = this.student.id;

        this.saving = true;
        if (this.newTutorship.id) {
            await this.studentFacade.setTutorship(this.student.id, this.newTutorship);
        } else {
            await this.studentFacade.addTutorship(this.student.id, this.newTutorship);
        }
        this.saving = false;
        this.student.Tutorships = await this.studentFacade.listTutorships(this.student.id);
        this.newTutorship = <Tutorship>{};
        this.showAddTutorship = false;
    }

    async delTutorship(tutorship: Tutorship) {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar esta tutoría?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentFacade.delTutorship(this.student.id, tutorship.id);
                this.student.Tutorships = await this.studentFacade.listTutorships(this.student.id);
                this.showAddTutorship = false;
            },
        });
    }
}
