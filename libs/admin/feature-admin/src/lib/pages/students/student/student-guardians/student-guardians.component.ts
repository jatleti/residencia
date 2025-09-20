import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    Student,
    Config,
    GuardianFacade,
    Guardian,
    PermissionsComponent,
    StudentFacade,
} from '@workspace/shared/util-core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-student-guardians',
    standalone: false,
    templateUrl: './student-guardians.component.html',
    styleUrl: './student-guardians.component.scss',
})
export class StudentGuardiansComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    router = inject(Router);
    guardianFacade = inject(GuardianFacade);
    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    guardians$: Observable<Guardian[]> = this.guardianFacade.guardiansSubject$;
    guardians: Guardian[] = [];
    selectedGuardian: Guardian | null = null;

    ngOnInit() {
        this.guardians$.pipe(takeUntil(this.destroy$)).subscribe((guardians) => {
            if (guardians) {
                this.guardians = guardians;
            }
        });

        if (this.isPermitted([this.Permissions.GUARDIAN.LIST])) {
            this.guardianFacade.list();
        }
    }

    get(id: string) {
        if (this.router) {
            this.router.navigate([Config.baseUrl, 'guardians', id]);
        }
    }

    async connectGuardian() {
        if (!this.selectedGuardian || !this.student || !this.student.id || !this.selectedGuardian.id) {
            return;
        }

        if (!this.selectedGuardian) {
            this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Debe seleccionar un padre' });
        }

        this.student = await this.studentFacade.connectGuardian(this.student.id, this.selectedGuardian.id);
        this.selectedGuardian = null;
    }

    async disconnectGuardian(guardian: Guardian) {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea eliminar este padre del alumno?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                if (!this.student || !this.student.id || !guardian.id) {
                    return;
                }

                this.student = await this.studentFacade.disconnectGuardian(this.student.id, guardian.id);
            },
        });
    }
}
