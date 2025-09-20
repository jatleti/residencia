import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Config, Student, StudentFacade } from '@workspace/shared/util-core';
import { Observable } from 'rxjs';

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

    ngOnInit() {
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
