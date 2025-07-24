import { Component, Input } from '@angular/core';
import { ContextMenuEntry } from './model/context-menu-entry';

@Component({
  selector: 'sim-context-menu',
  templateUrl: 'sim-context-menu.component.html',
  styleUrls: ['sim-context-menu.component.scss']
})

export class SimContextMenu<T> {

  private _menuEntries: ContextMenuEntry<T>[] = [];

  public menuItemsContainIcons: boolean;

  public get menuEntries(): ContextMenuEntry<T>[] {
    return this._menuEntries;
  }

  @Input()
  public set menuEntries(value: ContextMenuEntry<T>[]) {
    this._menuEntries = value;

    this.menuItemsContainIcons = value?.some(x => x.iconUrl) ?? false;
  }

  @Input()
  public menuEntryClickHandlerParameter: T;

  public clickContextMenuButton($event: MouseEvent) {
    $event.stopPropagation();
  }
}
