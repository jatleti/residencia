import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { RolePermission } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class RolePermissionDataService {
    constructor(private http: HttpClient) {}

    list(): Observable<RolePermission[]> {
        return this.http.get<RolePermission[]>(Endpoints.API + '/rolePermission');
    }

    get(id: string): Observable<RolePermission> {
        return this.http.get<RolePermission>(Endpoints.API + '/rolePermission/' + id);
    }

    set(rolePermission: RolePermission): Observable<RolePermission> {
        return this.http.patch<RolePermission>(Endpoints.API + '/rolePermission/' + rolePermission.id, { data: rolePermission });
    }

    add(rolePermission: RolePermission): Observable<RolePermission> {
        return this.http.post<RolePermission>(Endpoints.API + '/rolePermission', { data: rolePermission });
    }

    del(rolePermission: RolePermission): Observable<CustomResponse> {
        return this.http.request<CustomResponse>('delete', Endpoints.API + '/rolePermission/' + rolePermission.id, {
            body: {},
        });
    }
}
