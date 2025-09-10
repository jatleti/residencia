import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { AuthDataService } from '../infrastructure/auth.data.service';
import { getTokenUser } from '../factory/functions.factories';
import { Config } from '../config/config';
import { LocalStorageService } from '../factory/localStorage.factories';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    public errorLoginSubject = new BehaviorSubject<any>({});
    readonly errorLoginSubject$ = this.errorLoginSubject.asObservable();

    public userAuthSubject = new BehaviorSubject<string>('');
    readonly userAuthSubject$ = this.userAuthSubject.asObservable();

    public userIsAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    readonly userIsAuthenticatedSubject$ = this.userIsAuthenticatedSubject.asObservable();

    constructor(
        private authDataService: AuthDataService,
        private localStorageFactory: LocalStorageService,
    ) {}

    async login(email: string, password: string): Promise<any> {
        try {
            const session = await firstValueFrom(this.authDataService.login(email, password));

            if (session && session.mode && !session.token) {
                return session;
            }

            if (session && session.token && session.refreshToken) {
                this.localStorageFactory.setLocalStorage(Config.localUserToken, session.token);
                this.localStorageFactory.setLocalStorage(
                    Config.localUserPermissions,
                    session.permissionsToken,
                    'local',
                );
                this.localStorageFactory.setLocalStorage(Config.localUserRefreshToken, session.refreshToken);
            }
            this.userAuthSubject.next(session);
            this.userIsAuthenticatedSubject.next(true);
            return session;
        } catch (e: any) {
            this.userIsAuthenticatedSubject.next(false);
            this.errorLoginSubject.next(e.error);
        }
    }

    async logout(): Promise<any> {
        try {
            const currentRefreshToken = this.localStorageFactory.getLocalStorage(Config.localUserRefreshToken);
            if (!currentRefreshToken) throw new Error('No token');
            const session = await firstValueFrom(this.authDataService.logout(currentRefreshToken));
            this.localStorageFactory.removeLocalStorage(Config.localUserToken);
            this.localStorageFactory.removeLocalStorage(Config.localUserPermissions, 'local');
            this.localStorageFactory.removeLocalStorage(Config.localUserRefreshToken);
            this.userIsAuthenticatedSubject.next(false);
            return session;
        } catch (e: any) {
            this.userIsAuthenticatedSubject.next(false);
            this.errorLoginSubject.next(e.error);
        }
    }

    async checkAuth(): Promise<any> {
        try {
            const token = await getTokenUser(this.localStorageFactory);
            if (token) {
                this.userIsAuthenticatedSubject.next(true);
            } else {
                this.userIsAuthenticatedSubject.next(false);
            }
        } catch (e: any) {
            this.userIsAuthenticatedSubject.next(false);
            this.errorLoginSubject.next(e.error);
        }
    }

    refreshToken(): Observable<any> {
        return this.authDataService.refreshToken().pipe(
            catchError((e: any) => {
                this.userIsAuthenticatedSubject.next(false);
                this.errorLoginSubject.next(e.error);
                return throwError(e);
            }),
        );
    }

    async validateToken(): Promise<any> {
        return await firstValueFrom(this.authDataService.validateToken());
    }

    async magicLink(email: string): Promise<any> {
        return await firstValueFrom(this.authDataService.magicLink(email));
    }

    async validateMagicLink(token: string): Promise<any> {
        return await firstValueFrom(this.authDataService.validateMagicLink(token));
    }

    async validate2FACode(code: string): Promise<any> {
        return await firstValueFrom(this.authDataService.validate2FACode(code));
    }
}
