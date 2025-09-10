import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserDataService } from '../infrastructure/user.data.service';
import { Role, User } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class UserFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private usersSubject = new BehaviorSubject<User[]>([]);
    readonly usersSubject$ = this.usersSubject.asObservable();

    public userSubject = new BehaviorSubject<User>(<User>{});
    readonly userSubject$ = this.userSubject.asObservable();

    constructor(
        private userDataService: UserDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    list(): void {
        this.loadingSubject.next(true);
        this.userDataService.list().subscribe({
            next: (result) => {
                this.usersSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    //get
    get(id: string): void {
        this.loadingSubject.next(true);
        this.userSubject.next(<User>{});
        this.userDataService.get(id).subscribe({
            next: (result) => {
                this.userSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    getMe(): void {
        this.loadingSubject.next(true);
        this.userSubject.next(<User>{});
        this.userDataService.getMe().subscribe({
            next: (result) => {
                this.userSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(user: User): void {
        this.userDataService.set(user).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Usuario guardado',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    //add
    add(user: User): void {
        console.log('user', user);
        this.userDataService.add(user).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Usuario añadido',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/settings/users']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(user: User): void {
        this.loadingSubject.next(true);
        this.userDataService.del(user).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Usuario eliminado',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/settings/users']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    async setRole(userId: string, roleId: string): Promise<User> {
        return await firstValueFrom(this.userDataService.setRole(userId, roleId));
    }

    async addPermission(user: User, permission: string): Promise<User> {
        return await firstValueFrom(this.userDataService.addPermission(user, permission));
    }

    async delPermission(user: User, permission: string): Promise<User> {
        return await firstValueFrom(this.userDataService.delPermission(user, permission));
    }
}
