import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserPermissionDataService } from '../infrastructure/userPermission.data.service';
import { UserPermission } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class UserPermissionFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private userPermissionsSubject = new BehaviorSubject<UserPermission[]>([]);
    readonly userPermissionsSubject$ = this.userPermissionsSubject.asObservable();

    public userPermissionSubject = new BehaviorSubject<UserPermission>(<UserPermission>{});
    readonly userPermissionSubject$ = this.userPermissionSubject.asObservable();

    constructor(
        private userPermissionDataService: UserPermissionDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    list(): void {
        this.loadingSubject.next(true);
        this.userPermissionDataService.list().subscribe({
            next: (result) => {
                this.userPermissionsSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.userPermissionSubject.next(<UserPermission>{});
        this.userPermissionDataService.get(id).subscribe({
            next: (result) => {
                this.userPermissionSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(userPermission: UserPermission): void {
        this.userPermissionDataService.set(userPermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'User Permission saved',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(userPermission: UserPermission): void {
        this.userPermissionDataService.add(userPermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'User Permission added',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/userPermissions']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(userPermission: UserPermission): void {
        this.loadingSubject.next(true);
        this.userPermissionDataService.del(userPermission).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'User Permission deleted',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/userPermissions']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }
}
