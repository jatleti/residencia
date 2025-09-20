import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, InvoiceFacade, Config, Invoice } from '@workspace/shared/util-core';
import { Observable } from 'rxjs';

@Component({
    selector: 'admin-invoices',
    standalone: false,
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss',
})
export class InvoicesComponent extends PermissionsComponent implements OnInit {
    facade = inject(InvoiceFacade);
    router = inject(Router);
    url = Config.baseUrl + '/invoices';
    filter = '';

    list$: Observable<Invoice[]> = this.facade.invoicesSubject$;
    loading$: Observable<boolean> = this.facade.loadingSubject$;

    ngOnInit() {
        this.facade.list();
    }

    get(id: number) {
        if (this.router) {
            this.router.navigate([this.url, id]);
        }
    }

    add() {
        if (this.router) {
            this.router.navigate([this.url, 0]);
        }
    }
}
