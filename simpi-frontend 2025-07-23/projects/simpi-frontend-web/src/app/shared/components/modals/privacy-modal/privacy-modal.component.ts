import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeploymentStateResponse } from '../../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'sim-privacy-modal',
  templateUrl: 'privacy-modal.component.html',
  styleUrls: ['privacy-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PrivacyModalComponent {
  public deploymentState: typeof DeploymentStateResponse = DeploymentStateResponse;

  @Input()
  public form: FormGroup = this.fb.group({
    deploymentState: []
  });

  @Input()
  public targetType: string = 'Target';

  @Input()
  public targetName: string;

  constructor(public activeModal: NgbActiveModal, public fb: FormBuilder) {
  }

  public get selection(): DeploymentStateResponse {
    return this.form.get('deploymentState').value;
  }

  public set selection(value: DeploymentStateResponse) {
    this.form.setValue({'deploymentState': value});
  }

  public save(): void {
    this.activeModal.close(this.selection);
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }
}
