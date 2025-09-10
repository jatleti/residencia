import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {
    AuthFacade,
    Config,
    DestroyComponent,
    isPermitted,
    LocalStorageService,
    Permissions,
} from '@workspace/shared/util-core';

@Component({
    selector: 'components-menu',
    standalone: true,
    imports: [CommonModule, TooltipModule, RouterLink, RouterLinkActive],
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends DestroyComponent implements OnInit {
    authFacade = inject(AuthFacade);
    router = inject(Router);
    localStorageService = inject(LocalStorageService);

    userIsAuthenticated$: Observable<boolean> = this.authFacade.userIsAuthenticatedSubject$;

    permissions = Permissions;

    style: 'big' | 'minimal' = 'big';

    baseUrl = Config.baseUrl;

    ngOnInit() {
        this.authFacade.checkAuth();
        this.authFacade.validateToken();
    }

    async logOut() {
        await this.authFacade.logout();
        this.router.navigate(['login']);
    }

    isPermitted(permissions: string[]) {
        return isPermitted(permissions, this.localStorageService);
    }
}
