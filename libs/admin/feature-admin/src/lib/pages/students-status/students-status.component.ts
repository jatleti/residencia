import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, Student, StudentFacade } from '@workspace/shared/util-core';

@Component({
    selector: 'admin-students-status',
    standalone: false,
    templateUrl: './students-status.component.html',
    styleUrl: './students-status.component.scss',
})
export class StudentsStatusComponent extends PermissionsComponent implements OnInit {
    studentFacade = inject(StudentFacade);
    router = inject(Router);

    studentsCenter: Student[] = [];
    studentDinner: Student[] = [];

    ngOnInit() {
        this.init();
    }

    async init() {
        if (this.isPermitted([this.Permissions.STUDENT.LIST])) {
            this.studentsCenter = await this.studentFacade.listAllStudents();
            this.studentDinner = await this.studentFacade.listAllStudentsDinner();
        }
    }

    viewStudent(student: Student) {
        this.router.navigate(['/admin/students', student.id]);
    }
}
