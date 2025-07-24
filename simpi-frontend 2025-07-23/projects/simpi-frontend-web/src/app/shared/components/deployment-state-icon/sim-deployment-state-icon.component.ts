import { DeploymentStateResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'sim-deployment-state-icon',
  templateUrl: 'sim-deployment-state-icon.component.html',
  styleUrls: ['sim-deployment-state-icon.component.scss']
})

export class DeploymentStateIconComponent<T> {

    @Input()
    public deploymentState: DeploymentStateResponse;

    public deploymentStateEnum: typeof DeploymentStateResponse = DeploymentStateResponse;

    @HostListener("click", ['$event'])
    public onStepsLabelClick($event: MouseEvent) {
      if (this.clickHandler) {
        $event.stopPropagation();
        this.clickHandler(this.clickHandlerParameter);
      }
    }

    @HostListener("mousedown", ['$event'])
    public onMouseDown($event: MouseEvent) {
      if (this.clickHandler) {
        $event.stopPropagation();
      }
    }

    @HostListener("mouseup", ['$event'])
    public onMouseUp($event: MouseEvent) {
      if (this.clickHandler) {
        $event.stopPropagation();
      }
    }

    @Input()
    public clickHandler: (param: T) => void;

    @Input()
    public clickHandlerParameter: T;
}
