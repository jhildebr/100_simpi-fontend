import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sim-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardComponent<T> {

  @Input()
  public text: string;

  @Input()
  public brand: string;

  @Input()
  public imageUrl: string;

  @Input()
  public placeholderBackgroundColor: string;

  @Input()
  public LabelColor: string;

  @Input()
  public set numberOfSteps(value: number) {
    if (!value || isNaN(value)) {
      this.stepsText = '';
    }

    if (value === 1) {
      this.stepsText = '1 step';
    } else {
      this.stepsText = value.toString()  + ' steps'
    }
  }

  public stepsText: string;

  public get hasImage(): boolean {
    return !!this.imageUrl;
  }

  public onStepsLabelClick($event: MouseEvent) {
    if (this.stepsLabelClickHandler) {
      $event.stopPropagation();
      this.stepsLabelClickHandler(this.clickHandlerParameter);
    }
  }

  public onStepsLabelMouseUp($event: MouseEvent) {
    if (this.stepsLabelClickHandler) {
      // stopping propagation of "click" is not enough, if outer element have "mouseup"-listeners
      $event.stopPropagation();
    }
  }

  @Input()
  public stepsLabelClickHandler: (param: T) => void;

  @Input()
  public clickHandlerParameter: T;
}
