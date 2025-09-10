import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'components-status-active',
    standalone: true,
    imports: [CommonModule],
    template: `
        <i *ngIf="status === 1 && !inverse" class="fa-regular fa-circle-check text-green-500"></i>
        <i *ngIf="status === 0 && !inverse" class="fa-solid fa-circle-xmark text-red-500"></i>
        <i *ngIf="status === 0 && inverse" class="fa-regular fa-circle-check text-green-500"></i>
        <i *ngIf="status === 1 && inverse" class="fa-solid fa-circle-xmark text-red-500"></i>
    `,
    styles: [],
})
export class StatusActiveComponent {
    @Input() status = 0;
    @Input() inverse = false;
}
