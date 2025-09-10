import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError, filter, take, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthFacade } from '../facades/auth.facade';
import { Config } from '../config/config';
import { LocalStorageService } from '../factory/localStorage.factories';
import { LocationStrategy } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(
        private router: Router,
        private authFacade: AuthFacade,
        private messageService: MessageService,
        private localStorageService: LocalStorageService,
        private locationStrategy: LocationStrategy,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localStorageService.getLocalStorage(Config.localUserToken);
        const apiKeyToken = Config.apiKeyToken;

        const clonedReq = this.addToken(req, token, apiKeyToken);

        return next.handle(clonedReq).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    error.error?.error?.message === 'jwt expired'
                ) {
                    return this.handle401Error(req, next);
                }

                // Otros errores
                this.handleOtherErrors(error);
                return throwError(() => error);
            }),
        );
    }

    private addToken(req: HttpRequest<any>, token: string | null, apiKey: string): HttpRequest<any> {
        const headers: any = {
            Accept: 'application/json',
            apikey: apiKey,
            from: window.location.href,
            fromorigin: window.location.origin,
            path: this.locationStrategy.getBaseHref(),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            if (req.url.search('/file') === -1) {
                headers['Content-Type'] = 'application/json';
            }
        }

        return req.clone({ setHeaders: headers });
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            return this.authFacade.refreshToken().pipe(
                switchMap((newToken: string) => {
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(newToken);

                    this.localStorageService.setLocalStorage(Config.localUserToken, newToken);

                    return next.handle(this.addToken(req, newToken, Config.apiKeyToken));
                }),
                catchError((err) => {
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(null);

                    this.localStorageService.removeLocalStorage(Config.localUserToken);
                    this.localStorageService.removeLocalStorage(Config.localUserRefreshToken);
                    this.authFacade.userAuthSubject.next('');
                    this.authFacade.userIsAuthenticatedSubject.next(false);
                    this.router.navigate(['login']);

                    return throwError(() => err);
                }),
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token !== null),
                take(1),
                switchMap((token) => next.handle(this.addToken(req, token!, Config.apiKeyToken))),
            );
        }
    }

    private handleOtherErrors(error: HttpErrorResponse) {
        if (![401, 403, 405, 498].includes(error.status)) {
            this.messageService.add({
                severity: 'error',
                summary: String(error.status),
                detail: error.error?.error?.message,
            });
        }

        if ([403, 405, 498].includes(error.status)) {
            this.localStorageService.removeLocalStorage(Config.localUserToken);
            this.localStorageService.removeLocalStorage(Config.localUserRefreshToken);
            this.authFacade.userAuthSubject.next('');
            this.authFacade.userIsAuthenticatedSubject.next(false);
            this.router.navigate(['login']);

            this.messageService.add({
                severity: 'error',
                summary: String(error.status),
                detail: error.error?.error?.message,
            });
        }
    }
}
