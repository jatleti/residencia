import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    AttendanceSubTypes,
    AttendanceSubTypesDropdown,
    AttendanceTypes,
    getAgeNumber,
    PermissionsComponent,
    Student,
    StudentFacade,
} from '@workspace/shared/util-core';

export interface Bed {
    name: string;
    student?: Student;
}
export interface Room {
    room: string;
    beds: Bed[];
}

export interface studentsGrid {
    rooms: Room[];
}

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

    block1: studentsGrid = { rooms: [] };
    block2: studentsGrid = { rooms: [] };
    block3: studentsGrid = { rooms: [] };
    block4: studentsGrid = { rooms: [] };
    block5: studentsGrid = { rooms: [] };

    getAgeNumber = getAgeNumber;
    attendanceTypes = AttendanceTypes;
    attendanceSubTypes = AttendanceSubTypes;
    attendanceSubTypesDropdown = AttendanceSubTypesDropdown;

    tabIndex = 0;

    ngOnInit() {
        this.init();
    }

    async init() {
        if (this.isPermitted([this.Permissions.STUDENT.LIST])) {
            this.studentsCenter = await this.studentFacade.listAllStudents();
            this.studentDinner = await this.studentFacade.listAllStudentsDinner();
            this.formatStudents();
        }
    }

    viewStudent(student: Student) {
        this.router.navigate(['/admin/students', student.id]);
    }

    formatStudents() {
        // vamos a rellenar los bloques con habitaciones desde la 01 a la 20
        for (let i = 1; i <= 15; i++) {
            const roomNumber = i.toString().padStart(2, '0');
            // las camas son de la A a la D
            const beds: Bed[] = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];
            this.block1.rooms.push({ room: roomNumber, beds: JSON.parse(JSON.stringify(beds)) });
            this.block2.rooms.push({ room: roomNumber, beds: JSON.parse(JSON.stringify(beds)) });
            this.block3.rooms.push({ room: roomNumber, beds: JSON.parse(JSON.stringify(beds)) });
            this.block4.rooms.push({ room: roomNumber, beds: JSON.parse(JSON.stringify(beds)) });
            this.block5.rooms.push({ room: roomNumber, beds: JSON.parse(JSON.stringify(beds)) });
        }

        // ahora asignamos los estudiantes a las camas
        for (const room of this.block1.rooms) {
            for (const bed of room.beds) {
                const student = this.studentsCenter.find(
                    (s) => s.block === '1' && s.room === room.room && s.bed === bed.name,
                );
                if (student) {
                    bed.student = student;
                }
            }
        }

        for (const room of this.block2.rooms) {
            for (const bed of room.beds) {
                const student = this.studentsCenter.find(
                    (s) => s.block === '2' && s.room === room.room && s.bed === bed.name,
                );
                if (student) {
                    bed.student = student;
                }
            }
        }

        for (const room of this.block3.rooms) {
            for (const bed of room.beds) {
                const student = this.studentsCenter.find(
                    (s) => s.block === '3' && s.room === room.room && s.bed === bed.name,
                );
                if (student) {
                    bed.student = student;
                }
            }
        }

        for (const room of this.block4.rooms) {
            for (const bed of room.beds) {
                const student = this.studentsCenter.find(
                    (s) => s.block === '4' && s.room === room.room && s.bed === bed.name,
                );
                if (student) {
                    bed.student = student;
                }
            }
        }

        for (const room of this.block5.rooms) {
            for (const bed of room.beds) {
                const student = this.studentsCenter.find(
                    (s) => s.block === '5' && s.room === room.room && s.bed === bed.name,
                );
                if (student) {
                    bed.student = student;
                }
            }
        }
    }
}
