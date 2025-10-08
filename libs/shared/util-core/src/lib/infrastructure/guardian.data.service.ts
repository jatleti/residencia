import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Guardian, File } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class GuardianDataService {
    constructor(private http: HttpClient) {}

    // Guardian CRUD
    list(): Observable<Guardian[]> {
        return this.http.get<Guardian[]>(Endpoints.API + '/guardian');
    }

    get(id: string): Observable<Guardian> {
        return this.http.get<Guardian>(Endpoints.API + '/guardian/' + id);
    }

    add(guardian: Guardian): Observable<Guardian> {
        return this.http.post<Guardian>(Endpoints.API + '/guardian', { data: guardian });
    }

    set(guardian: Guardian): Observable<Guardian> {
        return this.http.patch<Guardian>(Endpoints.API + '/guardian/' + guardian.id, { data: guardian });
    }

    del(guardian: Guardian): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(Endpoints.API + '/guardian/' + guardian.id);
    }

    // files

    addFile(id: string, file: File): Observable<File[]> {
        return this.http.post<File[]>(Endpoints.API + '/guardian/' + id + '/fileDocuments', {
            data: file,
        });
    }

    getFile(id: string, fileId: string): Observable<File | null> {
        return this.http.get<File>(`${Endpoints.API}/guardian/${id}/fileDocuments/${fileId}`);
    }

    delFile(id: string, fileId: string): Observable<File[]> {
        return this.http.request<File[]>('delete', Endpoints.API + '/guardian/' + id + '/fileDocuments/' + fileId, {
            body: {},
        });
    }
}
