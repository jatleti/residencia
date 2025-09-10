import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import {
    ComboValues,
    UserFacade,
    User,
    Config,
    Role,
    RoleFacade,
    PermissionsComponent,
    Endpoints,
} from '@workspace/shared/util-core';
import { FileBeforeUploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'admin-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    standalone: false,
})
export class UserComponent extends PermissionsComponent implements OnInit {
    facade = inject(UserFacade);
    roleFacade = inject(RoleFacade);
    router = inject(Router);
    location = inject(Location);
    confirmationService = inject(ConfirmationService);
    messageService = inject(MessageService);
    activatedRoute = inject(ActivatedRoute);

    url = Config.baseUrl + '/settings/users';
    filter = '';
    param = 'id_user';
    id = '';

    originalItem: User = <User>{};

    item$: Observable<User> = this.facade.userSubject$;
    item: User = <User>{};
    loading$: Observable<boolean> = this.facade.loadingSubject$;
    loading = false;

    roles$: Observable<Role[]> = this.roleFacade.rolesSubject$;
    roles: Role[] = [];
    selectedPermissions: string[] = [];

    requiredFields: string[] = ['name', 'email'];

    comboRoles = ComboValues.ROLES;
    comboYesNo = ComboValues.YES_NO;
    comboSecure2FAModes = ComboValues.SECURE2FA_MODES;

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    signedPhoto = '';

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
                if (this.item.UserPermissions) {
                    this.selectedPermissions = this.item.UserPermissions.map((rp) => rp.name);
                }
            }
        });
        this.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
            this.loading = loading;
        });

        this.roles$.pipe(takeUntil(this.destroy$)).subscribe((roles) => {
            this.roles = roles;
        });
        this.roleFacade.list();
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
            const value = this.item[field as keyof User];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar',
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
            const value = this.item[field as keyof User];
            if (!value) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Faltan datos importantes por rellenar',
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

    async setRole() {
        this.confirmationService.confirm({
            message:
                '¿Seguro que deseas cambiarle el rol al usuario? Se sustituirían todos los permisos por los del rol seleccionado.',
            accept: async () => {
                if (this.item.roleId) {
                    await this.facade.setRole(this.item.id, this.item.roleId);
                    this.init();
                }
            },
        });
    }

    async savePermissions(event: string[]) {
        this.selectedPermissions = event;
        if (!this.originalItem || !this.originalItem.UserPermissions) return;

        // tenemos que detectar los permisos que se han añadido y los que se han quitado
        const added = [];
        for (const p of this.selectedPermissions) {
            if (this.originalItem.UserPermissions) {
                if (!this.originalItem.UserPermissions.some((rp) => rp.name === p)) {
                    added.push(p);
                }
            }
        }

        const removed = [];
        for (const rp of this.originalItem.UserPermissions) {
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

    permissionsRoleEqualsUser() {
        if (!this.item.roleId) return false;
        const roleSelected = this.roles.find((r) => r.id === this.item.roleId);
        if (!roleSelected) return false;
        if (!this.item.UserPermissions) return false;
        if (!roleSelected.RolePermissions) return false;

        const permissionsRole = roleSelected.RolePermissions.map((rp) => rp.name);
        const permissionsUser = this.item.UserPermissions.map((rp) => rp.name);

        // Verificar si los arrays tienen la misma longitud
        if (permissionsRole.length !== permissionsUser.length) return false;

        // Ordenar ambos arrays
        const sortedPermissionsRole = permissionsRole.slice().sort();
        const sortedPermissionsUser = permissionsUser.slice().sort();

        // Comparar los arrays elemento por elemento
        for (let i = 0; i < sortedPermissionsRole.length; i++) {
            if (sortedPermissionsRole[i] !== sortedPermissionsUser[i]) {
                return false;
            }
        }

        // Si todos los elementos coinciden, retornamos true
        return true;
    }

    onUpload(event: any) {
        this.item.photo = event.originalEvent.body.file;
        this.signedPhoto = event.originalEvent.body.signedFile;
    }

    onBeforeUpload($event: FileBeforeUploadEvent) {
        $event.formData.append('path', 'users');
    }
}
