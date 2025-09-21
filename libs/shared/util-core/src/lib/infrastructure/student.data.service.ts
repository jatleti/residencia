import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Student, Tutorship, Sanction, Authorization, Attendance } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class StudentDataService {
    constructor(private http: HttpClient) {}

    // Student CRUD
    list(): Observable<Student[]> {
        return this.http.get<Student[]>(Endpoints.API + '/student');
    }

    get(id: string): Observable<Student> {
        return this.http.get<Student>(Endpoints.API + '/student/' + id);
    }

    add(student: Student): Observable<Student> {
        return this.http.post<Student>(Endpoints.API + '/student', { data: student });
    }

    set(student: Student): Observable<Student> {
        return this.http.patch<Student>(Endpoints.API + '/student/' + student.id, { data: student });
    }

    del(student: Student): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(Endpoints.API + '/student/' + student.id);
    }

    listAllStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(Endpoints.API + '/attendance/listAllStudents');
    }

    listAllStudentsDinner(): Observable<Student[]> {
        return this.http.get<Student[]>(Endpoints.API + '/attendance/listAllStudentsDinner');
    }

    connectGuardian(studentId: string, guardianId: string): Observable<Student> {
        return this.http.post<Student>(`${Endpoints.API}/student/${studentId}/connectGuardian`, { guardianId });
    }

    disconnectGuardian(studentId: string, guardianId: string): Observable<Student> {
        return this.http.post<Student>(`${Endpoints.API}/student/${studentId}/disconnectGuardian`, { guardianId });
    }

    // Tutorship
    listTutorships(studentId: string): Observable<Tutorship[]> {
        return this.http.get<Tutorship[]>(`${Endpoints.API}/student/${studentId}/tutorship`);
    }

    getTutorship(studentId: string, id: string): Observable<Tutorship> {
        return this.http.get<Tutorship>(`${Endpoints.API}/student/${studentId}/tutorship/${id}`);
    }

    addTutorship(studentId: string, tutorship: Tutorship): Observable<Tutorship> {
        return this.http.post<Tutorship>(`${Endpoints.API}/student/${studentId}/tutorship`, { data: tutorship });
    }

    setTutorship(studentId: string, tutorship: Tutorship): Observable<Tutorship> {
        return this.http.patch<Tutorship>(`${Endpoints.API}/student/${studentId}/tutorship/${tutorship.id}`, {
            data: tutorship,
        });
    }

    delTutorship(studentId: string, tutorshipId: string): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(`${Endpoints.API}/student/${studentId}/tutorship/${tutorshipId}`);
    }

    // Sanction
    listSanctions(studentId: string): Observable<Sanction[]> {
        return this.http.get<Sanction[]>(`${Endpoints.API}/student/${studentId}/sanction`);
    }

    getSanction(studentId: string, id: string): Observable<Sanction> {
        return this.http.get<Sanction>(`${Endpoints.API}/student/${studentId}/sanction/${id}`);
    }

    addSanction(studentId: string, sanction: Sanction): Observable<Sanction> {
        return this.http.post<Sanction>(`${Endpoints.API}/student/${studentId}/sanction`, { data: sanction });
    }

    setSanction(studentId: string, sanction: Sanction): Observable<Sanction> {
        return this.http.patch<Sanction>(`${Endpoints.API}/student/${studentId}/sanction/${sanction.id}`, {
            data: sanction,
        });
    }

    delSanction(studentId: string, sanctionId: string): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(`${Endpoints.API}/student/${studentId}/sanction/${sanctionId}`);
    }

    // Authorization
    listAuthorizations(studentId: string): Observable<Authorization[]> {
        return this.http.get<Authorization[]>(`${Endpoints.API}/student/${studentId}/authorization`);
    }

    getAuthorization(studentId: string, id: string): Observable<Authorization> {
        return this.http.get<Authorization>(`${Endpoints.API}/student/${studentId}/authorization/${id}`);
    }

    addAuthorization(studentId: string, authorization: Authorization): Observable<Authorization> {
        return this.http.post<Authorization>(`${Endpoints.API}/student/${studentId}/authorization`, {
            data: authorization,
        });
    }

    setAuthorization(studentId: string, authorization: Authorization): Observable<Authorization> {
        return this.http.patch<Authorization>(
            `${Endpoints.API}/student/${studentId}/authorization/${authorization.id}`,
            { data: authorization },
        );
    }

    delAuthorization(studentId: string, authorizationId: string): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(
            `${Endpoints.API}/student/${studentId}/authorization/${authorizationId}`,
        );
    }

    // Attendance
    listAttendances(studentId: string): Observable<Attendance[]> {
        return this.http.get<Attendance[]>(`${Endpoints.API}/student/${studentId}/attendance`);
    }

    getAttendance(studentId: string, id: string): Observable<Attendance> {
        return this.http.get<Attendance>(`${Endpoints.API}/student/${studentId}/attendance/${id}`);
    }

    addAttendance(studentId: string, attendance: Attendance): Observable<Attendance> {
        return this.http.post<Attendance>(`${Endpoints.API}/student/${studentId}/attendance`, { data: attendance });
    }

    setAttendance(studentId: string, attendance: Attendance): Observable<Attendance> {
        return this.http.patch<Attendance>(`${Endpoints.API}/student/${studentId}/attendance/${attendance.id}`, {
            data: attendance,
        });
    }

    delAttendance(studentId: string, attendanceId: string): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(`${Endpoints.API}/student/${studentId}/attendance/${attendanceId}`);
    }
}
