import { Config } from '../config/config';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from './localStorage.factories';

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDateWithoutTime(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

export function isPermitted(permissions: string[], localStorageService: LocalStorageService) {
    const token = localStorageService.getLocalStorage(Config.localUserPermissions, 'local');
    let decodedToken: any;
    if (!token) {
        return false;
    } else {
        try {
            decodedToken = jwtDecode(token);
        } catch (Error) {
            decodedToken = null;
            return false;
        }

        if (decodedToken) {
            if (decodedToken.permissions === null || decodedToken.permissions === undefined) {
                return false;
            }
            //const arrayPermissions = decodedToken.permissions.split(',');
            const userPermissions = decodedToken.permissions;

            // permissions es un array de permisos que debe tener el usuario debe contener al menos uno de los permisos
            for (let i = 0; i < permissions.length; i++) {
                if (userPermissions.includes(permissions[i])) {
                    return true;
                }
            }
            return false;
        }
    }

    return false;
}

export function getTokenUser(localStorageService: LocalStorageService) {
    const token = localStorageService.getLocalStorage(Config.localUserToken);
    let decodedToken: any;
    if (!token) {
        return false;
    } else {
        try {
            decodedToken = jwtDecode(token);
        } catch (Error) {
            decodedToken = null;
            return false;
        }

        if (decodedToken) {
            return decodedToken;
        }
    }

    return false;
}

export function formatHourUTC(hour: number) {
    const tzoffset = new Date(hour).getTimezoneOffset() * 60000;
    const hourUTC = new Date(hour);
    // return HH:mm
    return hourUTC.toISOString().slice(11, 16);
}

export const detectAutofill = (element: any) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(window.getComputedStyle(element, null).getPropertyValue('appearance') === 'menulist-button');
        }, 600);
    });
};
