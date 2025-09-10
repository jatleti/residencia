import { Component, inject, OnInit } from '@angular/core';
import { Config, Role, RoleFacade, PermissionsComponent } from '@workspace/shared/util-core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-role',
    templateUrl: './role.component.html',
    styleUrl: './role.component.scss',
    standalone: false,
})
export class RoleComponent extends PermissionsComponent implements OnInit {
    facade = inject(RoleFacade);
    router = inject(Router);
    location = inject(Location);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    activatedRoute = inject(ActivatedRoute);

    url = Config.baseUrl + '/settings/roles';
    filter = '';
    param = 'id_role';
    id = '';

    originalItem: Role = <Role>{};

    item$: Observable<Role> = this.facade.roleSubject$;
    item: Role = <Role>{};
    loading$: Observable<boolean> = this.facade.loadingSubject$;
    loading = false;

    requiredFields: string[] = ['name'];

    selectedPermissions: string[] = [];

    ngOnInit() {
        this.activatedRoute.params.subscribe((routeParams: any) => {
            if (routeParams[this.param]) {
                this.id = routeParams[this.param];
                if (!this.id) this.id = '';
            }
            this.init();
        });
        this.item$.pipe(takeUntil(this.destroy$)).subscribe((item) => {
            if (item) {
                this.item = item;
                this.originalItem = JSON.parse(JSON.stringify(item));
                if (this.item.RolePermissions) {
                    this.selectedPermissions = this.item.RolePermissions.map((rp) => rp.name);
                }
            }
        });
        this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
            this.loading = loading;
        });
    }

    init() {
        this.facade.get(this.id);
    }

    back() {
        this.location.back();
    }

    add() {
        let error = false;
        // if item property is empty and is in requiredFields, show error
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Role];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + field,
                });
                error = true;
                return;
            }
        });
        if (error) return;
        this.facade.add(this.item);
    }

    save() {
        let error = false;
        this.requiredFields.forEach((field) => {
            const value = this.item[field as keyof Role];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar ' + field,
                });
                error = true;
                return;
            }
        });
        if (error) return;
        this.facade.set(this.item);
    }

    del() {
        this.confirmationService.confirm({
            message: '¿Seguro que deseas eliminarlo?',
            accept: () => {
                this.facade.del(this.item);
            },
        });
    }

    async savePermissions(event: string[]) {
        this.selectedPermissions = event;
        if (!this.originalItem || !this.originalItem.RolePermissions) return;

        // tenemos que detectar los permisos que se han añadido y los que se han quitado
        const added = [];
        for (const p of this.selectedPermissions) {
            if (this.originalItem.RolePermissions) {
                if (!this.originalItem.RolePermissions.some((rp) => rp.name === p)) {
                    added.push(p);
                }
            }
        }

        const removed = [];
        for (const rp of this.originalItem.RolePermissions) {
            if (!this.selectedPermissions.some((p) => rp.name === p)) {
                removed.push(String(rp.name));
            }
        }

        if (added.length > 0) {
            for (const p of added) {
                this.originalItem = await this.facade.addPermission(this.item, p);
            }
        }

        if (removed.length > 0) {
            for (const rp of removed) {
                this.originalItem = await this.facade.delPermission(this.item, rp);
            }
        }
    }

    applyToAll() {
        this.confirmationService.confirm({
            message:
                '¿Seguro que deseas aplicar de nuevo estos permisos a todos los usuarios con este rol? Se sobrescribirán los permisos actuales de aquellos que no los tengan bloqueados.',
            accept: async () => {
                await this.facade.updateAllPermissions(this.item);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Aplicados a todos',
                    detail: 'Estos permisos se han aplicado a todos los usuarios con este rol',
                });
            },
        });
    }
}
