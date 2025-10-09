import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SeasonDataService } from '../infrastructure/season.data.service';
import { Season } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class SeasonFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private seasonsSubject = new BehaviorSubject<Season[]>([]);
    readonly seasonsSubject$ = this.seasonsSubject.asObservable();

    public seasonSubject = new BehaviorSubject<Season>(<Season>{});
    readonly seasonSubject$ = this.seasonSubject.asObservable();

    constructor(
        private seasonDataService: SeasonDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    // CRUD de Season
    list(): void {
        this.loadingSubject.next(true);
        this.seasonDataService.list().subscribe({
            next: (result) => {
                this.seasonsSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.seasonSubject.next(<Season>{});
        this.seasonDataService.get(id).subscribe({
            next: (result) => {
                this.seasonSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(season: Season): void {
        this.seasonDataService.set(season).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Temporada guardada',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(season: Season): void {
        this.seasonDataService.add(season).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Temporada añadida',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/seasons']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(season: Season): void {
        this.loadingSubject.next(true);
        this.seasonDataService.del(season).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Temporada eliminada',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/seasons']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }
}