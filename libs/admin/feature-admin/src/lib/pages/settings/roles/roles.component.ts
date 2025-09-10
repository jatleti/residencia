import { Component, inject, OnInit } from '@angular/core';
import { Config, PermissionsComponent, Role, RoleFacade } from '@workspace/shared/util-core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'admin-roles',
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.scss',
    standalone: false,
})
export class RolesComponent extends PermissionsComponent implements OnInit {
    facade = inject(RoleFacade);
    router = inject(Router);
    url = Config.baseUrl + '/settings/roles';
    filter = '';

    list$: Observable<Role[]> = this.facade.rolesSubject$;
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
