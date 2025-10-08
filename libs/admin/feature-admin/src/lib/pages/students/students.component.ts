import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Config, Student, StudentFacade } from '@workspace/shared/util-core';
import { Observable, takeUntil } from 'rxjs';

@Component({
    selector: 'app-students',
    standalone: false,
    templateUrl: './students.component.html',
    styleUrl: './students.component.scss',
})
export class StudentsComponent extends PermissionsComponent implements OnInit {
    facade = inject(StudentFacade);
    router = inject(Router);
    url = Config.baseUrl + '/students';
    filter = '';

    list$: Observable<Student[]> = this.facade.studentsSubject$;
    loading$: Observable<boolean> = this.facade.loadingSubject$;

    allStudents: Student[] = [];
    ingressedStudents: Student[] = [];
    inactiveStudents: Student[] = [];
    admittedStudents: Student[] = [];

    tabIndex = 0;

    ngOnInit() {
        this.list$.pipe(takeUntil(this.destroy$)).subscribe((students) => {
            if (students) {
                this.allStudents = students;
                this.ingressedStudents = students.filter(
                    (s) => s.active === 1 && s.ingressed === 1 && s.admitted === 1,
                );
                this.inactiveStudents = students.filter((s) => s.active === 0);
                this.admittedStudents = students.filter((s) => s.active === 1 && s.admitted === 1 && s.ingressed === 0);
            }
        });

        this.facade.list();
    }

    get(id: number) {
        if (this.router) {
            this.router.navigate([this.url, id]);
        }
    }

    add() {
        if (this.router) {
            this.router.navigate([this.url, 0]);
        }
    }
}
