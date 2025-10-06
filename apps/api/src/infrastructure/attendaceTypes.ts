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
