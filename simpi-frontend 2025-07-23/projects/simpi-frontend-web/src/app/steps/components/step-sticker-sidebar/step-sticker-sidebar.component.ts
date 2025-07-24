import { Component, Input } from "@angular/core";
import { SimpiResponse } from "../../../../../../simpi-frontend-common/src/public-api";

@Component({
  selector: "sim-step-sticker-sidebar",
  templateUrl: "./step-sticker-sidebar.component.html",
  styleUrls: ["./step-sticker-sidebar.component.scss"],
})
export class StepStickerSidebarComponent {
  @Input()
  public simpi: SimpiResponse;
}
