import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { StatusActiveComponent } from '../status-active/status-active.component';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'components-dropdown',
    imports: [CommonModule, DropdownModule, FormsModule, EditorModule, StatusActiveComponent, SelectModule],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
    @Input() options: any[] = [];
    @Input() value: any = null;
    @Input() optionLabel = 'name';
    @Input() optionValue = 'id';
    @Input() placeholder = '';
    @Input() type = '';
    @Input() filter = true;
    @Input() virtualScroll = false;
    @Input() disabled = false;
    @Input() bulletColor = '';

    @Output() readonly valueChange = new EventEmitter<any>();

    onModelChange(value: any) {
        this.updateValue(value);
    }

    private updateValue(value: any) {
        this.value = value;
        this.valueChange.emit(value);
    }

    getValueLabel(value: any) {
        if (this.options.length > 0) {
            const option = this.options.find((option) => option.value === value);
            if (option) {
                return option[this.optionLabel];
            }
        }
        return '';
    }

    getValueColor() {
        if (this.options.length > 0) {
            const option = this.options.find((option) => option.value === this.value);
            if (option) {
                return option['color'];
            }
        }
        return '';
    }
}
