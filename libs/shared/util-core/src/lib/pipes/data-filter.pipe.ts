import _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter',
    standalone: false,
})
export class DataFilterPipe implements PipeTransform {
    transform(array: any, query: string): any {
        if (query) {
            const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const text = normalize(_.toLower(query));
            return _.filter(array, function (object: any) {
                return _(object).some(function (string: any) {
                    const aux = normalize(_.toLower(string));
                    return _(aux).includes(text);
                });
            });
        }
        return array;
    }
}
