import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'components-separator',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './separator.component.html',
    styleUrl: './separator.component.scss',
})
export class SeparatorComponent {
    @Input() text!: string;
}
