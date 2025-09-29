export class AttendanceTypes {
    public static readonly BUILDING = 0;
    public static readonly DINNER = 1;
}

export const AttendanceTypesDropdown = [
    { label: 'Centro', value: AttendanceTypes.BUILDING },
    { label: 'Comedor', value: AttendanceTypes.DINNER },
];
