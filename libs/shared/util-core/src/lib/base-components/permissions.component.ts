import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LocalStorageService } from '../factory/localStorage.factories';
import { Permissions } from '../infrastructure/permissions';
import { isPermitted } from '../factory/functions.factories';
import { DestroyComponent } from './destroy.component';

@Component({
    selector: 'core-permission-component',
    template: '',
    styleUrls: [],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class PermissionsComponent extends DestroyComponent {
    localStorageService = inject(LocalStorageService);
    protected readonly Permissions = Permissions;

    isPermitted(permissions: string[]): boolean {
        return isPermitted(permissions, this.localStorageService);
    }
}
