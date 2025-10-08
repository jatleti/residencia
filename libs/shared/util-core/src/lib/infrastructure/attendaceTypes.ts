export class AttendanceTypes {
    public static readonly ARRIVE = 0;
    public static readonly DINNER = 1;
    public static readonly LEAVE = 2;
}

export const AttendanceTypesDropdown = [
    { label: 'Llegada', value: AttendanceTypes.ARRIVE },
    { label: 'Salida', value: AttendanceTypes.LEAVE },
    { label: 'Comedor', value: AttendanceTypes.DINNER },
];

export class AttendanceSubTypes {
    public static readonly HOME = 0;
    public static readonly WALK = 1;
    public static readonly BREAKFAST = 2;
    public static readonly LUNCH = 3;
    public static readonly DINNER = 4;
    public static readonly TRAINING = 5;
    public static readonly AUTHORIZED = 6;
}

export const AttendanceSubTypesDropdown = [
    { label: 'Casa', value: AttendanceSubTypes.HOME },
    { label: 'Paseo', value: AttendanceSubTypes.WALK },
    { label: 'Desayuno', value: AttendanceSubTypes.BREAKFAST },
    { label: 'Comida', value: AttendanceSubTypes.LUNCH },
    { label: 'Cena', value: AttendanceSubTypes.DINNER },
    { label: 'Entrenamiento', value: AttendanceSubTypes.TRAINING },
    { label: 'Salida autorizada', value: AttendanceSubTypes.AUTHORIZED },
];
