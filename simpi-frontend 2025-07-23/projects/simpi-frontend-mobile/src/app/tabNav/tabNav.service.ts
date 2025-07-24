import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TabNavService {
    private _tabVisibility: BehaviorSubject<'hidden' | 'visible'> = new BehaviorSubject<'hidden' | 'visible'>('visible');
    public tabVisibility$: Observable<'hidden' | 'visible'> = this._tabVisibility.asObservable();

    public setVisibility(visibility: 'hidden' | 'visible'): void {
        if (visibility === 'visible') {
            this._tabVisibility.next('visible');
        } else {
            this._tabVisibility.next('hidden');
        }
    }
}
