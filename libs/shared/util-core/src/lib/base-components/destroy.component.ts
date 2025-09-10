import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'core-destroy-component',
    template: '',
    styleUrls: [],
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class DestroyComponent implements OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
