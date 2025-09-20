import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Student, StudentFacade, Sanction } from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-student-sanctions',
    standalone: false,
    templateUrl: './student-sanctions.component.html',
    styleUrl: './student-sanctions.component.scss',
})
export class StudentSanctionsComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newSanction: Sanction = <Sanction>{};
    showAddSanction = false;
    saving = false;

    router = inject(Router);

    ngOnInit() {
        this.newSanction = <Sanction>{};
        this.newSanction.date = new Date();
    }

    addSanction() {
        this.newSanction = <Sanction>{};
        this.newSanction.date = new Date();
        this.showAddSanction = true;
    }

    editSanction(sanction: Sanction) {
        this.newSanction = { ...sanction };
        if (this.newSanction.date) {
            this.newSanction.date = new Date(this.newSanction.date);
        }
        this.showAddSanction = true;
    }

    async saveSanction() {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        if (!this.newSanction.date) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una fecha a la sanción',
            });
            return;
        }
        if (!this.newSanction.description) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner un contenido a la sanción',
            });
            return;
        }
        if (!this.newSanction.name || this.newSanction.name.trim() === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una descripción a la sanción',
            });
            return;
        }

        this.newSanction.studentId = this.student.id;

        this.saving = true;
        if (this.newSanction.id) {
            await this.studentFacade.setSanction(this.student.id, this.newSanction);
        } else {
            await this.studentFacade.addSanction(this.student.id, this.newSanction);
        }
        this.saving = false;
        this.student.Sanctions = await this.studentFacade.listSanctions(this.student.id);
        this.newSanction = <Sanction>{};
        this.showAddSanction = false;
    }

    async delSanction(sanction: Sanction) {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar esta sanción?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentFacade.delSanction(this.student.id, sanction.id);
                this.student.Sanctions = await this.studentFacade.listSanctions(this.student.id);
                this.showAddSanction = false;
            },
        });
    }
}
