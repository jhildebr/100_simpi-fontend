import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ResourceResponse } from "../../../../../../simpi-frontend-common/src/public-api";
import { TableData } from "../../../shared/components/sim-table/model/tableData.model";

@Component({
  selector: "sim-assets-table",
  templateUrl: "assets-table.component.html",
  styleUrls: ["assets-table.component.scss"],
  providers: [DatePipe],
})
export class AssetsTableComponent implements OnInit {
  public staticColumns: any[] = ["menu"];

  public dynamicColumns: TableData<any>[] = [
    {
      prop: "iconOrThumbnail",
      text: "",
      cell: (resource) => `${resource.thumbnailUrl}`,
      imageOrIcon: () => "image",
    },
    { prop: "title", text: "name", cell: (resource) => `${resource.title}` },
    {
      prop: "creationDate",
      text: "uploaded",
      cell: (resource) =>
        `${this.datePipe.transform(resource.creationDate, "dd.MM.yyyy")}`,
    },
    {
      prop: "resourceType",
      text: "type",
      cell: (resource) => `${resource.resourceType}`,
    },
    {
      prop: "simpiCount",
      text: "used on",
      cell: (resource) =>
        `${resource.simpiCount} ${
          resource.simpiCount === 1 ? "Simpi" : "Simpis"
        }`,
    },
  ];

  @Input()
  public items: any[];

  @Output()
  public edit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly datePipe: DatePipe) {}

  public ngOnInit(): void {}

  public onSelectAsset(e: any): void {}
  public onDeleteAsset(e: any): void {}

  public onEditAsset(resource: ResourceResponse): void {
    this.edit.emit(resource.alias);
  }
}
