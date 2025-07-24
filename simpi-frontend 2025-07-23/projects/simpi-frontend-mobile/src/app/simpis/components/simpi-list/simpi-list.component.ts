import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
  selector: 'sim-simpi-list',
  templateUrl: 'simpi-list.component.html',
  styleUrls: ['simpi-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SimpiListComponent {

  public fourItems: number[] = [1, 2, 3, 4];

  @Input()
  public loading: boolean;

  @Input()
  public simpis: SimpiResponse[];

  @Output()
  public navigateToSimpi: EventEmitter<string> = new EventEmitter<string>();
}
