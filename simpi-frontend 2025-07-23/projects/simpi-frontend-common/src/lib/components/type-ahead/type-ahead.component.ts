import { Component,   Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sim-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss']
})
export class TypeAheadComponent<T> {

  constructor() { }

  @Input()
  public options: T[];

  @Input()
  public nameOf: (option: T) => string = t => "name" in t ? t["name"] : JSON.stringify(t);

  @Input()
  public set selected(value: T) {
    if (value != null) {
      this.search_term = this.nameOf(value);
    }
  }

  @Input()
  public readonly: boolean;

  @Input()
  public canCreateNewOptions: boolean = false;

  @Output()
  public selectedChange: EventEmitter<T> = new EventEmitter();

  public search_term: any;

  public suggestions: T[];

  public typeAhead(): void {
    this.suggestions = this.options?.filter(l => this.nameOf(l)?.toLowerCase().startsWith(this.search_term.toLowerCase()));
  }

  public autoComplete(event: KeyboardEvent): void {
    if (event.key == "Enter") {
      if (this.suggestions != null && this.suggestions.length > 0 && !this.canCreateNewOptions) {
        let completition = this.nameOf(this.suggestions[0]);
        if (completition != this.search_term) {
          this.search_term = completition;
          event.preventDefault();
        }
      }
    }
  }

  public get dropdownOpen(): boolean {
    if (this.suggestions && this.suggestions.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  public toggleDropdown(): void {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  public openDropdown(): void {
    this.suggestions = this.options;
  }

  public closeDropdown(): void {
    this.suggestions = null;
  }

  public selectOption(option: T): void {
    this.search_term = this.nameOf(option);
    this.selectedChange.emit(option);
    this.closeDropdown();
  }

  public submit(): void {
    if (this.canCreateNewOptions) {
      this.selectedChange.emit(this.search_term);
      this.closeDropdown();
    } else if (this.suggestions && this.suggestions.length > 0) {
      this.selectOption(this.suggestions[0]);
    }
  }
}
