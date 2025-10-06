import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Attendance, Student } from '../entities/schema';
import { AttendanceDataService } from '../infrastructure/attendance.data.service';

@Injectable({ providedIn: 'root' })
export class AttendanceFacade {
    constructor(private attendanceDataService: AttendanceDataService) {}

    async add(code: string, attendance: Attendance): Promise<Attendance> {
        return await firstValueFrom(this.attendanceDataService.add(code, attendance));
    }

    async search(code: string): Promise<Student> {
        return await firstValueFrom(this.attendanceDataService.search(code));
    }
}
