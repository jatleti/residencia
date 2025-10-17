import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Student, StudentFacade, Diary, ComboValues } from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-student-diaries',
    standalone: false,
    templateUrl: './student-diaries.component.html',
    styleUrl: './student-diaries.component.scss',
})
export class StudentDiariesComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    newDiary: Diary = <Diary>{};
    showAddDiary = false;
    saving = false;

    diaryTypes = ComboValues.DIARY_TYPES;

    router = inject(Router);

    ngOnInit() {
        this.newDiary = <Diary>{};
        this.newDiary.date = new Date();
    }

    addDiary() {
        this.newDiary = <Diary>{};
        this.newDiary.date = new Date();
        this.showAddDiary = true;
    }

    editDiary(diary: Diary) {
        this.newDiary = { ...diary };
        if (this.newDiary.date) {
            this.newDiary.date = new Date(this.newDiary.date);
        }
        this.showAddDiary = true;
    }

    getType(type: number): string {
        const found = this.diaryTypes.find((dt) => dt.value === type);
        return found ? found.label : 'Desconocido';
    }

    async saveDiary() {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        if (!this.newDiary.date) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes poner una fecha a la entrada del diario',
            });
            return;
        }
        if (!this.newDiary.type) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes seleccionar un tipo de entrada del diario',
            });
            return;
        }

        this.newDiary.studentId = this.student.id;

        this.saving = true;
        if (this.newDiary.id) {
            await this.studentFacade.setDiary(this.student.id, this.newDiary);
        } else {
            await this.studentFacade.addDiary(this.student.id, this.newDiary);
        }
        this.saving = false;
        this.student.Diaries = await this.studentFacade.listDiaries(this.student.id);
        this.newDiary = <Diary>{};
        this.showAddDiary = false;
    }

    async delDiary(diary: Diary) {
        if (!this.student || !this.student.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se ha podido identificar al alumno',
            });
            return;
        }
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar esta entrada del diario?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await this.studentFacade.delDiary(this.student.id, diary.id);
                this.student.Diaries = await this.studentFacade.listDiaries(this.student.id);
                this.showAddDiary = false;
            },
        });
    }
}
