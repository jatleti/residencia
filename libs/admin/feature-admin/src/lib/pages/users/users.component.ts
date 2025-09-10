import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config, PermissionsComponent, User, UserFacade } from '@workspace/shared/util-core';

@Component({
    selector: 'admin-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    standalone: false,
})
export class UsersComponent extends PermissionsComponent implements OnInit {
    facade = inject(UserFacade);
    router = inject(Router);
    url = Config.baseUrl + '/settings/users';
    filter = '';

    list$: Observable<User[]> = this.facade.usersSubject$;
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
