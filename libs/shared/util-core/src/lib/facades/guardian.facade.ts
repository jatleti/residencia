import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GuardianDataService } from '../infrastructure/guardian.data.service';
import { Guardian, File } from '../entities/schema';
import { Config } from '../config/config';
import { StudentFacade } from './student.facade';

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
        private studentFacade: StudentFacade,
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

    set(guardian: Guardian, studentId: string): void {
        this.guardianDataService.set(guardian).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor guardado',
                    detail: '',
                });
                this.studentFacade.get(studentId);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(guardian: Guardian, studentId: string): void {
        this.guardianDataService.add(guardian).subscribe({
            next: async (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor añadido',
                    detail: '',
                });
                //this.router.navigate([Config.baseUrl + '/guardians']);
                this.list();
                if (response && response.id && studentId) {
                    await this.studentFacade.connectGuardian(studentId, response.id);
                }
                this.studentFacade.get(studentId);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(guardian: Guardian, studentId: string): void {
        this.loadingSubject.next(true);
        this.guardianDataService.del(guardian).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Tutor eliminado',
                    detail: '',
                });
                //this.router.navigate([Config.baseUrl + '/guardians']);
                this.studentFacade.get(studentId);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    async addFile(id: string, file: File): Promise<File[]> {
        return await firstValueFrom(this.guardianDataService.addFile(id, file));
    }

    async getFile(id: string, fileId: string): Promise<File | null> {
        return await firstValueFrom(this.guardianDataService.getFile(id, fileId));
    }

    async delFile(id: string, fileId: string): Promise<File[]> {
        return await firstValueFrom(this.guardianDataService.delFile(id, fileId));
    }
}
