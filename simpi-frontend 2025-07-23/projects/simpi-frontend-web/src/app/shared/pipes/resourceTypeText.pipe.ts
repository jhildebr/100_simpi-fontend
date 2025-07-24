import { Pipe, PipeTransform } from '@angular/core';
import { ResourceTypeResponse } from '../../../../../simpi-frontend-common/src/lib/models';

@Pipe({
    name: 'resourceTypeText'
})

export class ResourceTypeTextPipe implements PipeTransform {
    private _resourceType: typeof ResourceTypeResponse = ResourceTypeResponse;
    transform(value: any): any {
        return this._resourceType[value];
    }
}