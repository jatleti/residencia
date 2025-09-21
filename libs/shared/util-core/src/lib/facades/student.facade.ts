import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { StudentDataService } from '../infrastructure/student.data.service';
import { Student, Tutorship, Sanction, Authorization, Attendance } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class StudentFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private studentsSubject = new BehaviorSubject<Student[]>([]);
    readonly studentsSubject$ = this.studentsSubject.asObservable();

    public studentSubject = new BehaviorSubject<Student>(<Student>{});
    readonly studentSubject$ = this.studentSubject.asObservable();

    constructor(
        private studentDataService: StudentDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    // CRUD de Student igual que User
    list(): void {
        this.loadingSubject.next(true);
        this.studentDataService.list().subscribe({
            next: (result) => {
                this.studentsSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.studentSubject.next(<Student>{});
        this.studentDataService.get(id).subscribe({
            next: (result) => {
                this.studentSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(student: Student): void {
        this.studentDataService.set(student).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Alumno guardado',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(student: Student): void {
        this.studentDataService.add(student).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Alumno añadido',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/students']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(student: Student): void {
        this.loadingSubject.next(true);
        this.studentDataService.del(student).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Alumno eliminado',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/students']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    async connectGuardian(studentId: string, guardianId: string): Promise<Student> {
        return await firstValueFrom(this.studentDataService.connectGuardian(studentId, guardianId));
    }

    async disconnectGuardian(studentId: string, guardianId: string): Promise<Student> {
        return await firstValueFrom(this.studentDataService.disconnectGuardian(studentId, guardianId));
    }

    // Métodos asíncronos para Tutorship, Sanction, Authorization y Attendance
    async listTutorships(studentId: string): Promise<Tutorship[]> {
        return await firstValueFrom(this.studentDataService.listTutorships(studentId));
    }

    async getTutorship(studentId: string, id: string): Promise<Tutorship> {
        return await firstValueFrom(this.studentDataService.getTutorship(studentId, id));
    }

    async addTutorship(studentId: string, tutorship: Tutorship): Promise<Tutorship> {
        return await firstValueFrom(this.studentDataService.addTutorship(studentId, tutorship));
    }

    async setTutorship(studentId: string, tutorship: Tutorship): Promise<Tutorship> {
        return await firstValueFrom(this.studentDataService.setTutorship(studentId, tutorship));
    }

    async delTutorship(studentId: string, tutorshipId: string): Promise<any> {
        return await firstValueFrom(this.studentDataService.delTutorship(studentId, tutorshipId));
    }

    async listSanctions(studentId: string): Promise<Sanction[]> {
        return await firstValueFrom(this.studentDataService.listSanctions(studentId));
    }

    async getSanction(studentId: string, id: string): Promise<Sanction> {
        return await firstValueFrom(this.studentDataService.getSanction(studentId, id));
    }

    async addSanction(studentId: string, sanction: Sanction): Promise<Sanction> {
        return await firstValueFrom(this.studentDataService.addSanction(studentId, sanction));
    }

    async setSanction(studentId: string, sanction: Sanction): Promise<Sanction> {
        return await firstValueFrom(this.studentDataService.setSanction(studentId, sanction));
    }

    async delSanction(studentId: string, sanctionId: string): Promise<any> {
        return await firstValueFrom(this.studentDataService.delSanction(studentId, sanctionId));
    }

    async listAuthorizations(studentId: string): Promise<Authorization[]> {
        return await firstValueFrom(this.studentDataService.listAuthorizations(studentId));
    }

    async getAuthorization(studentId: string, id: string): Promise<Authorization> {
        return await firstValueFrom(this.studentDataService.getAuthorization(studentId, id));
    }

    async addAuthorization(studentId: string, authorization: Authorization): Promise<Authorization> {
        return await firstValueFrom(this.studentDataService.addAuthorization(studentId, authorization));
    }

    async setAuthorization(studentId: string, authorization: Authorization): Promise<Authorization> {
        return await firstValueFrom(this.studentDataService.setAuthorization(studentId, authorization));
    }

    async delAuthorization(studentId: string, authorizationId: string): Promise<any> {
        return await firstValueFrom(this.studentDataService.delAuthorization(studentId, authorizationId));
    }

    async listAttendances(studentId: string): Promise<Attendance[]> {
        return await firstValueFrom(this.studentDataService.listAttendances(studentId));
    }

    async getAttendance(studentId: string, id: string): Promise<Attendance> {
        return await firstValueFrom(this.studentDataService.getAttendance(studentId, id));
    }

    async addAttendance(studentId: string, attendance: Attendance): Promise<Attendance> {
        return await firstValueFrom(this.studentDataService.addAttendance(studentId, attendance));
    }

    async setAttendance(studentId: string, attendance: Attendance): Promise<Attendance> {
        return await firstValueFrom(this.studentDataService.setAttendance(studentId, attendance));
    }

    async delAttendance(studentId: string, attendanceId: string): Promise<any> {
        return await firstValueFrom(this.studentDataService.delAttendance(studentId, attendanceId));
	}
	
	async listAllStudents(): Promise<Student[]> {
		return await firstValueFrom(this.studentDataService.listAllStudents());
	}

	async listAllStudentsDinner(): Promise<Student[]> {
		return await firstValueFrom(this.studentDataService.listAllStudentsDinner());
	}
}
