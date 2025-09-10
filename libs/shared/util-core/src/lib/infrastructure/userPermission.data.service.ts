import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { UserPermission } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class UserPermissionDataService {
    constructor(private http: HttpClient) {}

    list(): Observable<UserPermission[]> {
        return this.http.get<UserPermission[]>(Endpoints.API + '/userPermission');
    }

    get(id: string): Observable<UserPermission> {
        return this.http.get<UserPermission>(Endpoints.API + '/userPermission/' + id);
    }

    set(userPermission: UserPermission): Observable<UserPermission> {
        return this.http.patch<UserPermission>(Endpoints.API + '/userPermission/' + userPermission.id, {
            data: userPermission,
        });
    }

    add(userPermission: UserPermission): Observable<UserPermission> {
        return this.http.post<UserPermission>(Endpoints.API + '/userPermission', { data: userPermission });
    }

    del(userPermission: UserPermission): Observable<CustomResponse> {
        return this.http.request<CustomResponse>('delete', Endpoints.API + '/userPermission/' + userPermission.id, {
            body: {},
        });
    }
}
