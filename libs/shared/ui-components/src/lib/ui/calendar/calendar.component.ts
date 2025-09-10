import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'components-calendar',
    standalone: true,
    imports: [CommonModule, CalendarModule, FormsModule, DatePickerModule],
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
    @Input() value: any = '';
    @Input() placeholder = '';
    @Input() disabled = false;
    @Input() showTime = false;

    @Output() readonly valueChange = new EventEmitter<any>();

    onModelChange(value: any) {
        this.updateValue(value);
    }

    private updateValue(value: any) {
        this.value = value;
        this.valueChange.emit(value);
    }
}
