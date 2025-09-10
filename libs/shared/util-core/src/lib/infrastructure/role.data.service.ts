import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Role } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class RoleDataService {
    constructor(private http: HttpClient) {}

    list(): Observable<Role[]> {
        return this.http.get<Role[]>(Endpoints.API + '/role');
    }

    get(id: string): Observable<Role> {
        return this.http.get<Role>(Endpoints.API + '/role/' + id);
    }

    set(role: Role): Observable<Role> {
        return this.http.patch<Role>(Endpoints.API + '/role/' + role.id, { data: role });
    }

    add(role: Role): Observable<Role> {
        return this.http.post<Role>(Endpoints.API + '/role', { data: role });
    }

    del(role: Role): Observable<CustomResponse> {
        return this.http.request<CustomResponse>('delete', Endpoints.API + '/role/' + role.id, {
            body: {},
        });
    }

    addPermission(role: Role, permission: string): Observable<Role> {
        return this.http.post<Role>(Endpoints.API + '/role/' + role.id + '/permissions', { data: { permission } });
    }

    delPermission(role: Role, permission: string): Observable<Role> {
        return this.http.request<Role>('delete', Endpoints.API + '/role/' + role.id + '/permissions', {
            body: { data: { permission } },
        });
    }

    updateAllPermissions(role: Role): Observable<Role> {
        return this.http.patch<Role>(Endpoints.API + '/role/' + role.id + '/updateAllPermissions', { data: {} });
    }
}
