import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[disableAutofill]',
    standalone: false,
})
export class DiableAutofillDirective implements AfterViewInit {
    constructor(
        private readonly el: ElementRef,
        private readonly renderer: Renderer2,
    ) {}

    ngAfterViewInit() {
        const randomString = Math.random().toString(36).slice(-6);
        this.renderer.setAttribute(this.el.nativeElement, 'name', randomString);
        this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', randomString);
    }
}
