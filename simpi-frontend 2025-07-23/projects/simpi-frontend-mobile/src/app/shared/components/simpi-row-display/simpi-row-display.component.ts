import { Component, OnInit, Input } from '@angular/core';
import { Simpi } from '../../models/simpi.model';
import { Product } from '../../models/product';

@Component({
    selector: 'sim-simpi-row-display',
    templateUrl: './simpi-row-display.component.html',
    styleUrls: ['./simpi-row-display.component.scss'],
})
export class SimpiRowDisplayComponent implements OnInit {
    @Input()
    public rowTitle: string;
    @Input()
    public data: Simpi[] | Product[];
    @Input()
    public transparentRow: boolean = false;
    @Input()
    public noItemsText: string;

    constructor() { }

    ngOnInit() { }
}
