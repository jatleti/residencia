import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { PermissionsComponent, AttendanceFacade, AttendanceTypes, Attendance } from '@workspace/shared/util-core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-kiosk-dinner',
    standalone: false,
    templateUrl: './kiosk-dinner.component.html',
    styleUrl: './kiosk-dinner.component.scss',
})
export class KioskDinnerComponent extends PermissionsComponent implements OnInit, AfterViewInit {
    attendanceFacade = inject(AttendanceFacade);
    messageService = inject(MessageService);

    @ViewChild('codeInput') codeInput: any;

    code = '';
    type = AttendanceTypes.DINNER;

    attendance: Attendance | null = null;

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

    async add() {
        const newAttendante = <Attendance>{};
        this.showSuccess = false;
        this.attendance = null;
        newAttendante.type = this.type;
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
    }
}
