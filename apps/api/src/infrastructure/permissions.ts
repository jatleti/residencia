export const Permissions = {
    DASHBOARD: {
        VIEW: 'dashboard:view',
    },
    USER: {
        LIST: 'user:list',
        VIEW: 'user:view',
        EDIT: 'user:edit',
        DELETE: 'user:delete',
        CREATE: 'user:create',
    },
    SETTINGS: {
        VIEW: 'settings:view',
        EDIT: 'settings:edit',
        ROLES: {
            LIST: 'settings:roles:list',
            VIEW: 'settings:roles:view',
            EDIT: 'settings:roles:edit',
            DELETE: 'settings:roles:delete',
            CREATE: 'settings:roles:create',
        },
    },
};
