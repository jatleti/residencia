import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { isPermitted } from '../factory/functions.factories';
import { LocalStorageService } from '../factory/localStorage.factories';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
    constructor(
        public router: Router,
        private localStorageService: LocalStorageService,
    ) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedPermission: string[] = route.data['expectedPermission'];
        if (!isPermitted(expectedPermission, this.localStorageService)) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}
