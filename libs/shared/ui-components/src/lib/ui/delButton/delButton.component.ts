import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'components-del-button',
    imports: [CommonModule, ButtonModule, RippleModule],
    templateUrl: './delButton.component.html',
    styleUrl: './delButton.component.scss',
})
export class DelButtonComponent {
    @Output() readonly click = new EventEmitter<boolean>();

    onClick() {
        this.click.emit(true);
    }
}
