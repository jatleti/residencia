import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'components-filter',
    standalone: true,
    imports: [CommonModule, InputTextModule, FormsModule, ButtonModule, RippleModule],
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
    @Input() filter = '';
    @Output() readonly filterChange = new EventEmitter<string>();
    @Output() readonly clickAdd = new EventEmitter<boolean>();

    changeFilter() {
        this.filterChange.emit(this.filter);
    }

    add() {
        this.clickAdd.emit(true);
    }
}
