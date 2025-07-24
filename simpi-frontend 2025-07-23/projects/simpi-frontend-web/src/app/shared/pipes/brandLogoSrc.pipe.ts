import { Pipe, PipeTransform } from '@angular/core';
import { ResourceTypeResponse } from '../../../../../simpi-frontend-common/src/lib/models';
import { BrandService } from 'projects/simpi-frontend-common/src/lib/services/brand/brand.service';

@Pipe({
    name: 'brandLogoSrc'
})

export class BrandLogoSrcPipe implements PipeTransform {

    constructor(private brandService: BrandService) {
    }

    transform(logoImageId: string): string {
        if (!logoImageId) {
            return 'assets/images/logos/SIMPI_brand_logo_round.png';
        }
        return this.brandService.getLogoImageUrl(logoImageId);
    }
}
