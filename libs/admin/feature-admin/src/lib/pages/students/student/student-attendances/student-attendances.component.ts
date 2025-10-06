import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    PermissionsComponent,
    Student,
    StudentFacade,
    Attendance,
    ComboValues,
    AttendanceTypesDropdown,
    AttendanceSubTypesDropdown,
    AttendanceTypes,
} from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-student-attendances',
    standalone: false,
    templateUrl: './student-attendances.component.html',
    styleUrl: './student-attendances.component.scss',
})
export class StudentAttendancesComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newAttendance: Attendance = <Attendance>{};
    showAddAttendance = false;
    saving = false;

    router = inject(Router);

    comboYesNo = ComboValues.YES_NO;
    attendanceTypes = AttendanceTypesDropdown;
    attendanceSubTypes = AttendanceSubTypesDropdown;
    attendanceTypesEnum = AttendanceTypes;

    ngOnInit() {
        this.newAttendance = <Attendance>{};
        this.newAttendance.date = new Date();
    }

    addAttendance() {
        this.newAttendance = <Attendance>{};
        this.newAttendance.date = new Date();
        this.showAddAttendance = true;
    }

    editAttendance(attendance: Attendance) {
        this.newAttendance = { ...attendance };
        if (this.newAttendance.date) {
            this.newAttendance.date = new Date(this.newAttendance.date);
        }
        if (this.newAttendance.from) {
            this.newAttendance.from = new Date(this.newAttendance.from);
        }
        if (this.newAttendance.to) {
            this.newAttendance.to = new Date(this.newAttendance.to);
        }
        this.showAddAttendance = true;
    }

    async saveAttendance() {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }

        this.newAttendance.studentId = this.student.id;

        this.saving = true;
        if (this.newAttendance.id) {
            await this.studentFacade.setAttendance(this.student.id, this.newAttendance);
        } else {
            await this.studentFacade.addAttendance(this.student.id, this.newAttendance);
        }
        this.saving = false;
        this.student.Attendances = await this.studentFacade.listAttendances(this.student.id);
        this.newAttendance = <Attendance>{};
        this.showAddAttendance = false;
    }

    async delAttendance(attendance: Attendance) {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar este registro de asistencia?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentFacade.delAttendance(this.student.id, attendance.id);
                this.student.Attendances = await this.studentFacade.listAttendances(this.student.id);
                this.showAddAttendance = false;
            },
        });
    }

    getType(attendance: Attendance): string {
        const type = this.attendanceTypes.find((t) => t.value === attendance.type);
        return type ? type.label : 'Desconocido';
    }

    getSubType(attendance: Attendance): string {
        if (attendance.subtype === null || attendance.subtype === undefined) {
            return '';
        }
        const subtype = this.attendanceSubTypes.find((t) => t.value === attendance.subtype);
        return subtype ? subtype.label : '';
    }
}
