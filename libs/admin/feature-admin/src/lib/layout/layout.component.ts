import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'admin-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: false,
})
export class LayoutComponent implements AfterViewInit {
    @ViewChild('scrollContainer') scrollContainerRef!: ElementRef;

    constructor(private router: Router) {}

    ngAfterViewInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.scrollContainerRef.nativeElement.scrollTop = 0;
            }
        });
    }
}
