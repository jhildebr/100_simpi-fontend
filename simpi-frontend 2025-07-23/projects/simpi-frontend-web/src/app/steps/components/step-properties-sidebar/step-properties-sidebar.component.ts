import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sim-step-properties-sidebar',
  templateUrl: './step-properties-sidebar.component.html',
  styleUrls: ['./step-properties-sidebar.component.scss']
})
export class StepPropertiesSidebarComponent implements OnInit, OnDestroy {

  private maxWidth: string;

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public editModeEnabled: boolean;

  @Input()
  public stepForm: FormGroup;


  public ngOnInit(): void {
    this.maxWidth = document.getElementById('content').style.maxWidth;
    document.getElementById('content').style.maxWidth = 'unset';
  }

  public ngOnDestroy(): void {
    document.getElementById('content').style.maxWidth = this.maxWidth;
  }


}
