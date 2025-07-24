import { Component, Input } from "@angular/core";
import { SimpiResponse } from "../../../../../../simpi-frontend-common/src/public-api";

@Component({
  selector: "sim-step-translation-sidebar",
  templateUrl: "./step-translation-sidebar.component.html",
  styleUrls: ["./step-translation-sidebar.component.scss"],
})
export class StepTranslationSidebarComponent {
  @Input()
  public simpi: SimpiResponse;
}
