import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SimpiAssistantService {
    constructor() { }

    private simpiName: BehaviorSubject<string> = new BehaviorSubject<string>("New SIMPI");

    public simpiName$: Observable<string> = this.simpiName.asObservable();

    public setSimpiName(name: string): void {
        this.simpiName.next(name);
    }
}