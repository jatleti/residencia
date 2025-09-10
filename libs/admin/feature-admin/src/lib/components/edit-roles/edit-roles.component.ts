import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config, LocalStorageService, Permissions, PermissionsES } from '@workspace/shared/util-core';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { jwtDecode } from 'jwt-decode';

export interface Permission {
    key: string;
    value: string;
    open?: boolean;
    children?: Permission[];
}

@Component({
    selector: 'admin-edit-roles',
    standalone: true,
    imports: [CommonModule, AccordionModule, CheckboxModule, FormsModule, TreeModule],
    templateUrl: './edit-roles.component.html',
    styleUrl: './edit-roles.component.scss',
})
export class EditRolesComponent implements OnInit {
    localStorageService = inject(LocalStorageService);
    protected readonly Permissions = Permissions;

    permissionsArray: Permission[] = [];
    myPermissions: string[] = [];

    permissionsES = PermissionsES;

    @Input() selectedPermissions: string[] = [];
    @Input() from: 'user' | 'role' = 'user';
    @Output() selectedPermissionsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    savePermissions() {
        this.selectedPermissionsChange.emit(this.selectedPermissions);
    }

    ngOnInit() {
        this.permissionsArray = this.formatPermissions(Permissions);
        this.getPermissions();
        console.log(this.permissionsArray);
    }

    getPermissions() {
        const token = this.localStorageService.getLocalStorage(Config.localUserPermissions, 'local');
        let decodedToken: any;
        if (token) {
            decodedToken = jwtDecode(token);
        }
        if (decodedToken && decodedToken.permissions) {
            // permissions es un array que contiene los permisos del usuario, debería quitar de permissionsArray los permisos que no tiene el usuario para que no los pueda seleccionar
            this.myPermissions = decodedToken.permissions;
        }
    }

    formatPermissions(object: any) {
        const array = [];

        for (const key in object) {
            const newPermission: Permission = {
                key,
                value: object[key],
                children: [],
                open: false,
            };

            if (object[key] instanceof Object) {
                newPermission.children = this.formatPermissions(object[key]);
            }

            array.push(newPermission);
        }

        return array;
    }

    getLabel(label: string) {
        return this.permissionsES.find((permission) => permission.label === label)?.value || label;
    }

    isInMyPermissions(permission: string) {
        if (this.from === 'role') {
            return true;
        }
        return this.myPermissions.includes(permission);
    }
}
