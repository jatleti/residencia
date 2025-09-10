export class ComboValues {
    public static ROLES = [
        { label: 'Administrador', value: 0 },
        { label: 'Alumno', value: 1 },
    ];

    public static ROLES_VALUES = {
        ADMIN: 0,
        USER: 1,
    };

    public static YES_NO = [
        { label: 'Sí', value: 1 },
        { label: 'No', value: 0 },
    ];

    public static SECURE2FA_MODES = [{ label: 'Código 6 cifras', value: 'code' }];
}
