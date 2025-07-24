import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { ColorService } from '../../services/color-service/color.service';
import { Product } from '../../models/product';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'sim-simpi-slider',
    templateUrl: 'simpi-slider.component.html',
    styleUrls: ['simpi-slider.component.scss']
})
export class SimpiSliderComponent implements OnDestroy {
    private _componentActive: boolean = true;
    public iconColor: string;
    public iconColorByIndex: any[] = [];

    public slideOpts = {
        slidesPerView: 2,
        slidesPerColumnFill: 'row'
    };

    @Input()
    public noItemsText: string;

    @ViewChild('slider') slider: IonSlides;
    private _value: Product[];

    @Input()
    public set data(value: Product[]) {
        this._value = value;
    }

    public get data(): Product[] {
        return this._value;
    }

    constructor(private colorService: ColorService, private navCtrl: NavController) { }

    public trackByFn(index: number, item: any): number | any {
        return index;
    }

    public removeFavorite(e: MouseEvent, id: string): void {
        e.stopPropagation();
        this._value = this.data.filter(x => x.productId !== id);
        this.iconColorByIndex = this.iconColorByIndex.filter(x => x.id !== id);
    }

    public getIconColor(id: string): string {
        const result: any = this.iconColorByIndex.find(x => x.id === id);
        if (result) {
            return result.value;
        }
    }

    public onImageLoaded(imageUrl: any, id: string): void {
        this.colorService.getProminentColorOfImage(imageUrl).pipe(
            tap(d => {
                this.iconColorByIndex.push({ id, value: d });
            }),
            takeWhile(() => this._componentActive)
        ).subscribe();
    }

    public goToProduct(id: string): void {
        this.navCtrl.navigateRoot(`/products/${id}`, { replaceUrl: true });
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

}
