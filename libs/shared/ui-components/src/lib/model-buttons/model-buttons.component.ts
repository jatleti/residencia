import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'components-model-buttons',
    standalone: true,
    imports: [CommonModule, ButtonModule, RippleModule],
    templateUrl: './model-buttons.component.html',
    styleUrls: ['./model-buttons.component.scss'],
})
export class ModelButtonsComponent {
    @Input() showSave = true;
    @Input() showDelete = true;
    @Input() showAdd = true;
    @Input() showBack = true;

    @Output() readonly clickSave = new EventEmitter<boolean>();
    @Output() readonly clickDelete = new EventEmitter<boolean>();
    @Output() readonly clickAdd = new EventEmitter<boolean>();
    @Output() readonly clickBack = new EventEmitter<boolean>();

    save() {
        this.clickSave.emit(true);
    }

    delete() {
        this.clickDelete.emit(true);
    }

    add() {
        this.clickAdd.emit(true);
    }

    back() {
        this.clickBack.emit(true);
    }
}
