import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade, Config, LocalStorageService } from '@workspace/shared/util-core';

@Component({
    selector: 'workspace-magic-link',
    templateUrl: './magic-link.component.html',
    styleUrl: './magic-link.component.scss',
    standalone: false,
})
export class MagicLinkComponent implements OnInit {
    activatedRoute = inject(ActivatedRoute);
    authFacade = inject(AuthFacade);
    router = inject(Router);
    localStorageFactory = inject(LocalStorageService);

    token = '';
    error = '';

    ngOnInit() {
        this.activatedRoute.params.subscribe((routeParams: any) => {
            if (routeParams['token']) {
                this.token = routeParams['token'];
                if (!this.token) this.token = '';
            }
            this.init();
        });
    }

    async init() {
        const response = await this.authFacade.validateMagicLink(this.token);
        if (response && response.status !== 200) {
            this.error = response.message;
        }
        if (response && response.status === 200) {
            //localStorage.setItem(Config.localUserToken, response.message);
            if (response) {
                this.localStorageFactory.setLocalStorage(Config.localUserToken, response.token);
                this.localStorageFactory.setLocalStorage(Config.localUserRefreshToken, response.refreshToken);
            }
            this.router.navigate([Config.baseUrl]);
        }
    }
}
