import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from './endpoints';
import { Config } from '../config/config';
import { LocalStorageService } from '../factory/localStorage.factories';

@Injectable({ providedIn: 'root' })
export class AuthDataService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
    ) {}

    login(email: string, password: string): Observable<any> {
        const body: any = {
            email: email,
            password: password,
        };
        return this.http.post<any>(Endpoints.API + '/login', body);
    }

    logout(refreshToken: string): Observable<any> {
        return this.http.post<any>(Endpoints.API + '/session/close', { refreshToken });
    }

    validateToken(): Observable<any> {
        return this.http.get<any>(Endpoints.API + '/session/validateToken');
    }

    refreshToken(): Observable<any> {
        const refreshToken = this.localStorageService.getLocalStorage(Config.localUserRefreshToken);
        return this.http.post<any>(Endpoints.API + '/login/refreshToken', { refreshToken });
    }

    magicLink(email: string): Observable<any> {
        const body: any = {
            email: email,
        };
        return this.http.post<any>(Endpoints.API + '/login/magicLink', body);
    }

    validateMagicLink(token: string): Observable<any> {
        const body: any = {
            token: token,
        };
        return this.http.post<any>(Endpoints.API + '/login/validateMagicLink', body);
    }

    validate2FACode(code: string): Observable<any> {
        const body: any = {
            code: code,
        };
        return this.http.post<any>(Endpoints.API + '/login/validate2FACode', body);
    }
}
