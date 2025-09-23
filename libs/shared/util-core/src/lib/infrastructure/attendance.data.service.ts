import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { Attendance } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class AttendanceDataService {
    constructor(private http: HttpClient) {}

    add(code: string, attendance: Attendance): Observable<Attendance> {
        return this.http.post<Attendance>(Endpoints.API + '/attendance/student/' + code, { data: { attendance } });
    }
}
