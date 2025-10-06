import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {
    Attendance,
    AttendanceFacade,
    AttendanceSubTypes,
    AttendanceTypes,
    PermissionsComponent,
    Student,
} from '@workspace/shared/util-core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-kiosk',
    standalone: false,
    templateUrl: './kiosk.component.html',
    styleUrl: './kiosk.component.scss',
})
export class KioskComponent extends PermissionsComponent implements OnInit, AfterViewInit {
    attendanceFacade = inject(AttendanceFacade);
    messageService = inject(MessageService);

    @ViewChild('codeInput') codeInput: any;

    code = '';
    type = AttendanceTypes.ARRIVE;
    subtype = AttendanceSubTypes.HOME;

    attebdanceTypes = AttendanceTypes;
    attendanceSubTypes = AttendanceSubTypes;

    attendance: Attendance | null = null;
    student: Student | null = null;

    showSuccess = false;
    showError = false;

    ngOnInit() {}

    ngAfterViewInit() {
        // ponemos el foco en el input al cargar el componente
        setTimeout(() => {
            this.codeInput?.nativeElement.focus();
        }, 0);
    }

    setType(type: number) {
        this.type = type;
        setTimeout(() => {
            this.codeInput?.nativeElement.focus();
        }, 10);
    }

    setSubtype(subtype: number) {
        this.subtype = subtype;
        setTimeout(() => {
            this.codeInput?.nativeElement.focus();
        }, 10);
    }

    cancel() {
        this.code = '';
        this.attendance = null;
        this.student = null;
    }

    async search() {
        this.student = null;
        if (!this.code || this.code.trim() === '') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El código no puede estar vacío' });
            return;
        }
        this.student = await this.attendanceFacade.search(this.code);
    }

    async add() {
        const newAttendante = <Attendance>{};
        this.showSuccess = false;
        this.attendance = null;
        newAttendante.type = this.type;
        newAttendante.subtype = this.subtype;
        if (!this.code || this.code.trim() === '') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El código no puede estar vacío' });
            return;
        }

        try {
            this.attendance = await this.attendanceFacade.add(this.code, newAttendante);
            //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Asistencia registrada' });
            this.code = '';
            this.showSuccess = true;
            setTimeout(() => {
                this.showSuccess = false;
            }, 5000);
        } catch (e) {
            //this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar la asistencia' });
            this.showError = true;
            setTimeout(() => {
                this.showError = false;
            }, 5000);
        }
        this.cancel();
    }
}
