import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeploymentStateRequest } from '../../../../../../simpi-frontend-common/src/lib/models';

@Component({
    selector: 'sim-create-simpi-modal',
    templateUrl: 'create-simpi-modal.component.html',
    styleUrls: ['create-simpi-modal.component.scss']
})

export class CreateSimpiModalComponent implements OnInit {
    @Input()
    public thumbnail: string;

    public createSimpiForm: FormGroup;

    @ViewChild('coverImg', { static: true })
    public coverImg: ElementRef<HTMLImageElement>;

    constructor(private modalCtrl: ModalController, private fb: FormBuilder) { }

    public closeModal(): void {
        this.modalCtrl.dismiss();
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public saveSimpi(): void {
        this.modalCtrl.dismiss(this.createSimpiForm.value);
    }

    public saveAndPublishSimpi(): void {
        this.createSimpiForm.patchValue({ deploymentState: DeploymentStateRequest.Public });
        this.saveSimpi();
    }

    private initForm(): void {
        this.createSimpiForm = this.fb.group({
            title: '',
            description: '',
            deploymentState: DeploymentStateRequest.Private
        });
    }
}