import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { Capacitor } from '@capacitor/core';

@Pipe({
    name: 'sanitizeImg'
})

export class SanitizeImgPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(value: any, type: string = 'image'): any {
        if (type === 'image') {
            return this.sanitizer.bypassSecurityTrustUrl(Capacitor.convertFileSrc(value));
        }
        else {
            return this.sanitizer.bypassSecurityTrustResourceUrl(Capacitor.convertFileSrc(value));
        }
    }
}