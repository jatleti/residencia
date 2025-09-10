import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade } from '../facades/auth.facade';
import { Config } from '../config/config';
import { LocalStorageService } from '../factory/localStorage.factories';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
    loginData: any;
    currentUserToken: any;
    constructor(
        private router: Router,
        private authFacade: AuthFacade,
        private localStorageService: LocalStorageService,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        this.currentUserToken = this.localStorageService.getLocalStorage(Config.localUserToken);

        const promise: Promise<boolean> = new Promise((resolve, reject) => {
            if (this.currentUserToken) {
                this.authFacade.userIsAuthenticatedSubject.next(true);
                this.authFacade.userAuthSubject.next(this.currentUserToken);
                resolve(true);
            } else {
                this.authFacade.userAuthSubject.next('');
                this.authFacade.userIsAuthenticatedSubject.next(false);
                this.router.navigate(['login']);
            }
        });
        return promise;
    }
}
