import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';

@Component({
    selector: 'sim-refresher',
    template: `
        <ion-refresher #refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
    `,
    styles: [`
        ion-refresher {
            z-index: 3;
        }
    `]
})

export class AppRefresherComponent {
    @ViewChild('refresher', { static: true })
    public refresher: IonRefresher;

    @Output()
    public refreshData: EventEmitter<IonRefresher> = new EventEmitter<IonRefresher>();

    public doRefresh(e: any) {
        this.refreshData.emit(e.target);
    }
}
