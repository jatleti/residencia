import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { Attendance, Diary, Student } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
    constructor(private http: HttpClient) {}

    list(): Observable<Diary[]> {
        return this.http.get<Diary[]>(Endpoints.API + '/diary');
    }
}
