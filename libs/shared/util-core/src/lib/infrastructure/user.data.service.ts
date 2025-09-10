import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Role, User } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class UserDataService {
    constructor(private http: HttpClient) {}

    list(): Observable<User[]> {
        return this.http.get<User[]>(Endpoints.API + '/user');
    }

    get(id: string): Observable<User> {
        return this.http.get<User>(Endpoints.API + '/user/' + id);
    }

    getMe(): Observable<User> {
        return this.http.get<User>(Endpoints.API + '/user/me');
    }

    set(user: User): Observable<User> {
        return this.http.patch<User>(Endpoints.API + '/user/' + user.id, { data: user });
    }

    //add
    add(user: User): Observable<User> {
        return this.http.post<User>(Endpoints.API + '/user', { data: user });
    }

    del(user: User): Observable<CustomResponse> {
        return this.http.request<CustomResponse>('delete', Endpoints.API + '/user/' + user.id, {
            body: {},
        });
    }

    setRole(id: string, roleId: string): Observable<User> {
        return this.http.patch<User>(Endpoints.API + '/user/' + id + '/role', { data: { roleId } });
    }

    addPermission(user: User, permission: string): Observable<User> {
        return this.http.post<User>(Endpoints.API + '/user/' + user.id + '/permissions', { data: { permission } });
    }

    delPermission(user: User, permission: string): Observable<User> {
        return this.http.request<User>('delete', Endpoints.API + '/user/' + user.id + '/permissions', {
            body: { data: { permission } },
        });
    }
}
