import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    PermissionsComponent,
    Student,
    GuardianFacade,
    StudentFacade,
    Guardian,
    Config,
    SeasonFacade,
    Season,
    StudentSeason,
} from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-student-seasons',
    standalone: false,
    templateUrl: './student-seasons.component.html',
    styleUrl: './student-seasons.component.scss',
})
export class StudentSeasonsComponent extends PermissionsComponent implements OnInit {
    @Input() student!: Student;

    router = inject(Router);
    seasonFacade = inject(SeasonFacade);
    studentFacade = inject(StudentFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    seasons$: Observable<Season[]> = this.seasonFacade.seasonsSubject$;
    seasons: Season[] = [];
    selectedSeason: Season | null = null;

    ngOnInit() {
        this.seasons$.pipe(takeUntil(this.destroy$)).subscribe((seasons) => {
            if (seasons) {
                this.seasons = seasons;
            }
        });

        this.seasonFacade.list();

        if (this.student && this.student.StudentSeasons) {
            for (const ss of this.student.StudentSeasons) {
                if (ss.from) ss.from = new Date(ss.from);
                if (ss.to) ss.to = new Date(ss.to);
            }
        }
    }

    get(id: string) {
        if (this.router) {
            this.router.navigate([Config.baseUrl, 'guardians', id]);
        }
    }

    async addSeason() {
        if (!this.selectedSeason || !this.student || !this.student.id || !this.selectedSeason.id) {
            return;
        }

        if (!this.selectedSeason) {
            this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Debe seleccionar un curso' });
        }

        this.student = await this.studentFacade.addSeason(this.student.id, this.selectedSeason.id);
        this.selectedSeason = null;
    }

    async delSeason(studenSeason: StudentSeason) {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea eliminar este padre del alumno?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                if (!this.student || !this.student.id || !studenSeason.seasonId) {
                    return;
                }

                this.student = await this.studentFacade.delSeason(this.student.id, studenSeason.id);
            },
        });
    }

    async setStudentSeason(studentSeason: StudentSeason) {
        if (!this.student || !this.student.id) {
            return;
        }

        await this.studentFacade.setStudentSeason(this.student.id, studentSeason);
        this.messageService.add({ severity: 'success', summary: 'Curso actualizado', detail: '' });
    }
}
