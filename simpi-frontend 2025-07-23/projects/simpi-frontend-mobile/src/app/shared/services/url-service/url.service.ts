import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UrlService {
    private _previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    public setPreviousUrl(previousUrl: string): void {
        this._previousUrl.next(previousUrl);
    }

    public getPreviousUrl(): string {
        return this._previousUrl.getValue();
    }

    public getValidUrl(url: string): string {
        const urlExp =  /(http(s?)):\/\//i;
        const urlRegEx = new RegExp(urlExp);
        if (!url.match(urlRegEx)) {
          url = `https://${url}`;
        }
        return url;
    }
}