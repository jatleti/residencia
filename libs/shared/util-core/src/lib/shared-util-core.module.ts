import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/nglet.directive';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { DiableAutofillDirective } from './directives/disableAutofill.directive';
import { SafeHtmlPipe } from './pipes/safeHtml.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [NgLetDirective, DataFilterPipe, SafeHtmlPipe, DiableAutofillDirective],
    exports: [NgLetDirective, DataFilterPipe, SafeHtmlPipe, DiableAutofillDirective],
})
export class SharedUtilCoreModule {}
