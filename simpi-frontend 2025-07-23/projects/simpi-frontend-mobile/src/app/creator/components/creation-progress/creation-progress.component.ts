import { Component, Input } from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CreatorService } from '../../services/creator.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'sim-creation-progress',
    templateUrl: 'creation-progress.component.html',
    styles: [`
        .progress-bar-container {
            height: 10%;
        }
    `]
})

export class CreationProgressComponent implements ViewWillEnter {
    @Input()
    public totalFiles: number;

    @Input()
    public currentFile$: Observable<number>;

    public progress: number = 0;

    constructor(private modalCtrl: ModalController, private creatorService: CreatorService) { }

    public ionViewWillEnter(): void {
        this.currentFile$ = this.creatorService.currentFile$.pipe(
            tap(currentFile => {
                this.progress = (currentFile * 100 / this.totalFiles) / 100;
            })
        );
    }

    public dismiss(): void {
        this.modalCtrl.dismiss();
    }
}
