import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Config, Student } from '@workspace/shared/util-core';

@Component({
    selector: 'admin-student-invoices',
    standalone: false,
    templateUrl: './student-invoices.component.html',
    styleUrl: './student-invoices.component.scss',
})
export class StudentInvoicesComponent {
    @Input() student!: Student;

    router = inject(Router);

    get(id: number) {
        if (this.router) {
            this.router.navigate([Config.baseUrl, 'invoices', id]);
        }
    }
}
