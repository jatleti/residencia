import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RolePermissionDataService } from '../infrastructure/rolePermission.data.service';
import { RolePermission } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class RolePermissionFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private rolePermissionsSubject = new BehaviorSubject<RolePermission[]>([]);
    readonly rolePermissionsSubject$ = this.rolePermissionsSubject.asObservable();

    public rolePermissionSubject = new BehaviorSubject<RolePermission>(<RolePermission>{});
    readonly rolePermissionSubject$ = this.rolePermissionSubject.asObservable();

    constructor(
        private rolePermissionDataService: RolePermissionDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    list(): void {
        this.loadingSubject.next(true);
        this.rolePermissionDataService.list().subscribe({
            next: (result) => {
                this.rolePermissionsSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.rolePermissionSubject.next(<RolePermission>{});
        this.rolePermissionDataService.get(id).subscribe({
            next: (result) => {
                this.rolePermissionSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(rolePermission: RolePermission): void {
        this.rolePermissionDataService.set(rolePermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role Permission saved',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(rolePermission: RolePermission): void {
        this.rolePermissionDataService.add(rolePermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role Permission added',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/rolePermissions']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(rolePermission: RolePermission): void {
        this.loadingSubject.next(true);
        this.rolePermissionDataService.del(rolePermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role Permission deleted',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/rolePermissions']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }
}
