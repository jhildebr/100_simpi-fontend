import { Component, Input } from '@angular/core';
import { TabNavItem } from '../../models/tabNavItem';

@Component({
    selector: 'sim-tab-nav',
    templateUrl: 'tab-nav.component.html',
    styleUrls: ['tab-nav.component.scss']
})
export class TabNavComponent {
    @Input()
    public routes: TabNavItem[];
}
