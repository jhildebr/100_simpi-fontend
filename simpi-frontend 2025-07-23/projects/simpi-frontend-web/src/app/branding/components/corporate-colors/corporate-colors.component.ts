import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'sim-corporate-colors',
    templateUrl: './corporate-colors.component.html',
    styleUrls: ['./corporate-colors.component.scss']
})
export class CorporateColorsComponent implements OnInit, OnDestroy {

    @Input()
    public brandForm: FormGroup;

    @Output()
    public colorChanged: EventEmitter<void> = new EventEmitter();
    
    ngOnInit(): void {
    }
    ngOnDestroy(): void {
    }

    onColorChanged(): void{
        this.colorChanged.emit();
    }

}
