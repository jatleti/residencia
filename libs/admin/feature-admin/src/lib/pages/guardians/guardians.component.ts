import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsComponent, GuardianFacade, Config, Guardian } from '@workspace/shared/util-core';
import { Observable } from 'rxjs';

@Component({
    selector: 'admin-guardians',
    standalone: false,
    templateUrl: './guardians.component.html',
    styleUrl: './guardians.component.scss',
})
export class GuardiansComponent extends PermissionsComponent implements OnInit {
    facade = inject(GuardianFacade);
    router = inject(Router);
    url = Config.baseUrl + '/guardians';
    filter = '';

    list$: Observable<Guardian[]> = this.facade.guardiansSubject$;
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
