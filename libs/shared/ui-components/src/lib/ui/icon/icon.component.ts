import { Component, ElementRef, inject, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadIcon } from 'iconify-icon';
import { SharedUtilCoreModule } from '@workspace/shared/util-core';

@Component({
    selector: 'components-icon',
    standalone: true,
    imports: [CommonModule, SharedUtilCoreModule],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
})
export class IconComponent implements OnChanges {
    private _elementRef = inject(ElementRef);

    @Input() name: string | any;
    @Input() stroke = 2;

    @Input({ transform: numberAttribute })
    set size(size: number) {
        this._elementRef.nativeElement.style.setProperty('--icon-size', size + 'px');
    }

    path = '';
    loaded = false;

    private _viewBoxWidth = 0;
    private _viewBoxHeight = 0;

    get viewBox() {
        return `0 0 ${this._viewBoxWidth} ${this._viewBoxHeight}`;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['name'] && changes['name'].currentValue !== changes['name'].previousValue) {
            this._loadIcon();
        }
    }

    private _loadIcon() {
        this.loaded = false;
        loadIcon(this.name).then((data) => {
            this.path = data.body;
            this.path = this.path.replace(/stroke-width="\d+"/, 'stroke-width="' + this.stroke + '"');
            this._viewBoxWidth = data.width;
            this._viewBoxHeight = data.height;
            this.loaded = true;
        });
    }
}
