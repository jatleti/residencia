import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { isPermitted } from '../factory/functions.factories';
import { LocalStorageService } from '../factory/localStorage.factories';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class PermissionGuardService implements CanActivate {
    constructor(
        public router: Router,
        private localStorageService: LocalStorageService,
        private messageService: MessageService,
    ) {}
    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedPermission: string[] = route.data['expectedPermission'];
        if (!isPermitted(expectedPermission, this.localStorageService)) {
            console.log('expectedPermission', expectedPermission);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'You do not have permission to access this page.',
            });
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }
}
