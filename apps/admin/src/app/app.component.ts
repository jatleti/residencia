import { Component, inject, OnInit } from '@angular/core';
import { FilterMatchMode } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'workspace-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false,
})
export class AppComponent implements OnInit {
    config = inject(PrimeNG);

    title = 'admin';

    ngOnInit() {
        this.config.filterMatchModeOptions = {
            text: [
                FilterMatchMode.STARTS_WITH,
                FilterMatchMode.CONTAINS,
                FilterMatchMode.NOT_CONTAINS,
                FilterMatchMode.ENDS_WITH,
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS,
            ],
            numeric: [
                FilterMatchMode.EQUALS,
                FilterMatchMode.NOT_EQUALS,
                FilterMatchMode.LESS_THAN,
                FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
                FilterMatchMode.GREATER_THAN,
                FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            ],
            date: [
                FilterMatchMode.DATE_IS,
                FilterMatchMode.DATE_IS_NOT,
                FilterMatchMode.DATE_BEFORE,
                FilterMatchMode.DATE_AFTER,
            ],
        };

        this.config.setTranslation({
            startsWith: 'Empieza por',
            contains: 'Contiene',
            notContains: 'No contiene',
            endsWith: 'Termina por',
            equals: 'Igual',
            notEquals: 'No igual',
            noFilter: 'Sin filtro',
            lt: 'Menor que',
            lte: 'Menor o igual que',
            gt: 'Mayor que',
            gte: 'Mayor o igual que',
            is: 'Es',
            isNot: 'No es',
            before: 'Antes',
            after: 'Después',
            clear: 'Limpiar',
            apply: 'Aplicar',
            matchAll: 'Coincidir todo',
            matchAny: 'Coincidir cualquier',
            addRule: 'Añadir regla',
            removeRule: 'Eliminar regla',
            accept: 'Aceptar',
            reject: 'Cancelar',
            choose: 'Elegir',
            upload: 'Subir',
            cancel: 'Cancelar',
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            monthNames: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            today: 'Hoy',
            weekHeader: 'Semana',
            firstDayOfWeek: 0,
        });
    }
}
