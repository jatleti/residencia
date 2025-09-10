import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'components-button',
    standalone: true,
    imports: [CommonModule, ButtonModule, RippleModule],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() type: 'primary' | 'secondary' | 'rounded' = 'primary';
    @Input() label = 'Button';
    @Input() icon = '';
    @Output() readonly clicked = new EventEmitter<boolean>();

    onClick() {
        this.clicked.emit(true);
    }
}
