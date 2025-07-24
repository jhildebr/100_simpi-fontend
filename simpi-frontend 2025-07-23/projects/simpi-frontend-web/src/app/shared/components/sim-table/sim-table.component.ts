import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewChecked,
  AfterViewInit,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  moveItemInArray,
  CdkDragDrop,
  CdkDragHandle,
  CdkDrag,
} from "@angular/cdk/drag-drop";
import { CdkTable } from "@angular/cdk/table";
import { NgbDropdown } from "@ng-bootstrap/ng-bootstrap";
import { TableData } from "./model/tableData.model";
import { ChangeOrderRequest } from "../../../../../../simpi-frontend-common/src/lib/models";

@Component({
  selector: "sim-table",
  templateUrl: "sim-table.component.html",
  styleUrls: ["sim-table.component.scss"],
})
export class SimpiTableComponent<T> implements AfterViewChecked {
  private _dynamicColumns: TableData<T>[];
  private _data: T[];

  public displayedColumns: any[];
  public dragging: boolean = false;
  public showSpinner: boolean = true;

  @ViewChild("table")
  public table: CdkTable<any>;

  @ViewChildren("menu")
  public menu: QueryList<NgbDropdown>;

  @ViewChildren(CdkDragHandle)
  public handles: QueryList<CdkDragHandle>;

  @ViewChildren(CdkDrag)
  public drags: QueryList<CdkDrag>;

  @Input()
  public showAddRow: boolean = true;

  @Input()
  public staticColumns: any = ["menu", "dragHandle"];

  @Input()
  public shouldOpenModal: boolean = false;

  @Input()
  public errorLoadingData: boolean;

  @Input()
  public set data(val: T[]) {
    if (val) {
      this._data = val;
    }
  }

  public get data(): T[] {
    return this._data;
  }

  @Input()
  public type: string;

  @Input()
  public imageUrl: string;

  @Input()
  public formGroup: FormGroup;

  @Input()
  public selectedItemId: string;

  @Input()
  public addModeEnabled: boolean;

  @Input()
  public idName: string;

  @Output()
  public openModal: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public delete: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public edit: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public restore: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public reloadData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public submitForm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public clickedRow: EventEmitter<T> = new EventEmitter<T>();

  @Output()
  public clickedOnShareBtn: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public enableAddMode: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public disableAddMode: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public routeToData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public updateItemArray: EventEmitter<ChangeOrderRequest[]> = new EventEmitter<
    ChangeOrderRequest[]
  >();

  constructor(private cdr: ChangeDetectorRef) {}

  public ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    this.displayedColumns = [
      ...this.dynamicColumns.map((c) => c.prop),
      ...this.staticColumns,
    ];
  }

  @Input()
  public set dynamicColumns(val: TableData<T>[]) {
    if (val) {
      this._dynamicColumns = val;
    }
  }

  public get dynamicColumns(): TableData<T>[] {
    return this._dynamicColumns;
  }

  public onDragStart(): void {
    document.body.style.cursor = "grabbing";
  }

  public onDragRelease(): void {
    document.body.style.cursor = "grab";
  }

  public onDragEnd(): void {
    document.body.style.cursor = "default";
  }

  public clickedCancel(e: any): void {
    e.stopPropagation();
    this.disableAddMode.emit();
  }

  public clickedAddRow(): void {
    if (this.shouldOpenModal) {
      this.openModal.emit();
    } else {
      this.enableAddMode.emit();
    }
  }

  public onClickedRow(row: T): void {
    this.closeAllDropdowns();
    this.clickedRow.emit(row);
  }

  private closeAllDropdowns(): void {
    const menus = this.menu.toArray();
    menus.forEach((x) => {
      if (x.isOpen()) {
        x.close();
      }
    });
  }

  public onDropdownChange(e: any, index: number): void {
    const menuArr = this.menu.toArray();
    const otherMenus = menuArr.filter((x, i) => i !== index);

    otherMenus.forEach((x) => x.close());
  }

  public trackByFn(i: number, item: T) {
    return i;
  }

  public onDrop(event: CdkDragDrop<T[]>): void {
    const prevIndex = this.data.findIndex((d) => d === event.item.data);
    if (event.currentIndex !== prevIndex) {
      moveItemInArray(this.data, prevIndex, event.currentIndex);
      const idsAndIndexes: ChangeOrderRequest[] = this.data.map((x, i) => {
        return { objectId: x[this.idName], positionIndex: i };
      });
      this.updateItemArray.emit(idsAndIndexes);
      this.table.renderRows();
      this.cdr.detectChanges();
    }
  }
}
