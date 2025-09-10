import { Component, inject } from '@angular/core';
import { LocalStorageService, Config, isPermitted, Permissions } from '@workspace/shared/util-core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-settings',
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
    standalone: false,
})
export class SettingsComponent {
    protected readonly permissions = Permissions;
    localStorageService = inject(LocalStorageService);
    messageService = inject(MessageService);

    baseUrl = Config.baseUrl;

    downloadingExcel = false;

    isPermitted(permissions: string[]) {
        return isPermitted(permissions, this.localStorageService);
    }
}
