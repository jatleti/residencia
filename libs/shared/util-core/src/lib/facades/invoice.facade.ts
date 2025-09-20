import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { InvoiceDataService } from '../infrastructure/invoice.data.service';
import { Invoice } from '../entities/schema';
import { Config } from '../config/config';

@Injectable({ providedIn: 'root' })
export class InvoiceFacade {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loadingSubject$ = this.loadingSubject.asObservable();

    private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
    readonly invoicesSubject$ = this.invoicesSubject.asObservable();

    public invoiceSubject = new BehaviorSubject<Invoice>(<Invoice>{});
    readonly invoiceSubject$ = this.invoiceSubject.asObservable();

    constructor(
        private invoiceDataService: InvoiceDataService,
        private messageService: MessageService,
        private router: Router,
    ) {}

    loading(value: boolean) {
        this.loadingSubject.next(value);
    }

    // CRUD de Invoice
    list(): void {
        this.loadingSubject.next(true);
        this.invoiceDataService.list().subscribe({
            next: (result) => {
                this.invoicesSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    get(id: string): void {
        this.loadingSubject.next(true);
        this.invoiceSubject.next(<Invoice>{});
        this.invoiceDataService.get(id).subscribe({
            next: (result) => {
                this.invoiceSubject.next(result);
                this.loadingSubject.next(false);
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    set(invoice: Invoice): void {
        this.invoiceDataService.set(invoice).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Factura guardada',
                    detail: '',
                });
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    add(invoice: Invoice): void {
        this.invoiceDataService.add(invoice).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Factura añadida',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/invoices']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }

    del(invoice: Invoice): void {
        this.loadingSubject.next(true);
        this.invoiceDataService.del(invoice).subscribe({
            next: (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Factura eliminada',
                    detail: '',
                });
                this.router.navigate([Config.baseUrl + '/invoices']);
                this.list();
            },
            error: (err) => {
                console.error('err', err);
            },
        });
    }
}
