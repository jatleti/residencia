import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RoleDataService } from '../infrastructure/role.data.service';
import { Role } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class RoleFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private rolesSubject = new BehaviorSubject<Role[]>([]);
    readonly rolesSubject$ = this.rolesSubject.asObservable();

    public roleSubject = new BehaviorSubject<Role>(<Role>{});
    readonly roleSubject$ = this.roleSubject.asObservable();

    constructor(
        private roleDataService: RoleDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    list(): void {
        this.loadingSubject.next(true);
        this.roleDataService.list().subscribe({
            next: (result) => {
                this.rolesSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.roleSubject.next(<Role>{});
        this.roleDataService.get(id).subscribe({
            next: (result) => {
                this.roleSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(role: Role): void {
        this.roleDataService.set(role).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role saved',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(role: Role): void {
        this.roleDataService.add(role).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role added',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/settings/roles']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(role: Role): void {
        this.loadingSubject.next(true);
        this.roleDataService.del(role).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Role deleted',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/settings/roles']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    async addPermission(role: Role, permission: string): Promise<Role> {
        return await firstValueFrom(this.roleDataService.addPermission(role, permission));
    }

    async delPermission(role: Role, permission: string): Promise<Role> {
        return await firstValueFrom(this.roleDataService.delPermission(role, permission));
    }

    async updateAllPermissions(role: Role): Promise<Role> {
        return await firstValueFrom(this.roleDataService.updateAllPermissions(role));
    }
}
