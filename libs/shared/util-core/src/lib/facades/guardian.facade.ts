import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GuardianDataService } from '../infrastructure/guardian.data.service';
import { Guardian } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class GuardianFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private guardiansSubject = new BehaviorSubject<Guardian[]>([]);
    readonly guardiansSubject$ = this.guardiansSubject.asObservable();

    public guardianSubject = new BehaviorSubject<Guardian>(<Guardian>{});
    readonly guardianSubject$ = this.guardianSubject.asObservable();

    constructor(
        private guardianDataService: GuardianDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    // CRUD de Guardian
    list(): void {
        this.loadingSubject.next(true);
        this.guardianDataService.list().subscribe({
            next: (result) => {
                this.guardiansSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.guardianSubject.next(<Guardian>{});
        this.guardianDataService.get(id).subscribe({
            next: (result) => {
                this.guardianSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(guardian: Guardian): void {
        this.guardianDataService.set(guardian).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor guardado',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(guardian: Guardian): void {
        this.guardianDataService.add(guardian).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor añadido',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/guardians']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(guardian: Guardian): void {
        this.loadingSubject.next(true);
        this.guardianDataService.del(guardian).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor eliminado',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/guardians']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }
}
