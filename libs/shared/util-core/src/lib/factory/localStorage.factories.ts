import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Endpoints } from '../infrastructure/endpoints';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    forceTargetValue: 'cookie' | 'local' = 'local';
    forceTarget = true;

    cookieService = inject(CookieService);

    public getLocalStorage(key: string, target: 'cookie' | 'local' = 'cookie'): string {
        if (this.forceTarget) {
            target = this.forceTargetValue;
        }

        let token: string | null = '';
        if (target === 'cookie') {
            token = this.cookieService.get(key);
        } else {
            if (localStorage && localStorage.getItem(key) !== null) {
                token = localStorage.getItem(key);
            }
        }
        if (!token) {
            return '';
        } else {
            return token;
        }
    }

    public setLocalStorage(key: string, value: string, target: 'cookie' | 'local' = 'cookie') {
        if (this.forceTarget) {
            target = this.forceTargetValue;
        }

        if (target === 'cookie') {
            this.cookieService.set(key, value, undefined, '/', Endpoints.DOMAIN);
        } else {
            localStorage.setItem(key, value);
        }
    }

    public removeLocalStorage(key: string, target: 'cookie' | 'local' = 'cookie') {
        if (this.forceTarget) {
            target = this.forceTargetValue;
        }

        if (target === 'cookie') {
            this.cookieService.delete(key, '/', Endpoints.DOMAIN);
        } else {
            localStorage.removeItem(key);
        }
    }
}
