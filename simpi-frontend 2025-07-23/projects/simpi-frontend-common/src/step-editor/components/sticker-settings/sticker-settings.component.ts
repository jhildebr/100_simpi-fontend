import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StickerSettings } from '../../models/stickerSettings';
import { StickerInfo } from '../../models/stickerInfo';
import { ResourceService } from '../../../lib/services/resources/resource.service';
import { ResourceResponse } from '../../../lib/models';
import { map, takeWhile, timeoutWith } from 'rxjs/operators';

@Component({
  selector: 'sim-sticker-settings',
  templateUrl: './sticker-settings.component.html',
  styleUrls: ['./sticker-settings.component.scss'],
})
export class StickerSettingsComponent implements OnInit, OnDestroy {

  private componentActive: boolean = false;

  private _stickerInfo: StickerInfo;

  private resources: ResourceResponse[];

  public stickerSettingsFormGroup: FormGroup;

  public showValidationErrors: boolean = false;

  public showResourceProperties: boolean = false;

  constructor(
    private fb: FormBuilder,
    private resourcesService: ResourceService,
  ) {
  }

  public get stickerInfo(): StickerInfo {
    return this._stickerInfo;
  }

  @Input()
  public set stickerInfo(value: StickerInfo) {
    this._stickerInfo = value;
    this.showResourceProperties = value.actionType === 'resource';
  }

  @Output()
  public onSaveSettings: EventEmitter<StickerSettings> = new EventEmitter<StickerSettings>();

  @Output()
  public onDismiss: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    this.componentActive = true;
    this.showValidationErrors = false;
    this.populateFormGroup();
    this.resourcesService.resources$
      .pipe(
        takeWhile(() => this.componentActive),
        map(res => res && res.filter(r => !r.deleted)),
        timeoutWith(2_000, this.resourcesService.getResources().pipe(takeWhile(() => this.componentActive)))
      )
      .subscribe((resources: ResourceResponse[]): void => {
        this.resources = resources;
        this.patchActionTargetUrlInFormGroup();
      });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public validateForm(): void {
    this.showValidationErrors = !this.stickerSettingsFormGroup.valid;
  }

  public saveSettings(): void {
    if (this.stickerSettingsFormGroup.valid) {
      const stickerSettings = new StickerSettings(
        this.stickerSettingsFormGroup.get('appearanceDelayInSeconds').value * 1_000,
        this.stickerSettingsFormGroup.get('showPopUpEffect').value,
        this.stickerSettingsFormGroup.get('actionTargetUrl').value);
      this.onSaveSettings.emit(stickerSettings);
    } else {
      this.showValidationErrors = true;
    }
  }

  public dismiss(): void {
    this.onDismiss.emit();
  }

  private populateFormGroup(): void {
    const appearanceDelayInMilliseconds: number = this.stickerInfo?.appearanceDelayInMilliseconds ?? 0;
    const appearanceDelayInSeconds: number = appearanceDelayInMilliseconds / 1_000;
    const showPopUpEffect: boolean = this.stickerInfo?.showPopUpEffect ?? true;
    const actionTargetUrl: string = this.getActionTargetUrl();

    this.stickerSettingsFormGroup = this.fb.group({
      appearanceDelayInSeconds: [appearanceDelayInSeconds, [Validators.required, Validators.min(0)]],
      showPopUpEffect: showPopUpEffect,
      actionTargetUrl: actionTargetUrl,
    });
  }

  private patchActionTargetUrlInFormGroup(): void {
    const actionTargetUrl: string = this.getActionTargetUrl();
    this.stickerSettingsFormGroup?.get('actionTargetUrl')?.patchValue(actionTargetUrl);
  }

  private getActionTargetUrl(): string {
    if (!this.stickerInfo) {
      return '';
    }

    const stickerActionTargetUrl: string = this.stickerInfo.actionTargetUrl;
    if (stickerActionTargetUrl) {
      return stickerActionTargetUrl;
    }

    const resource: ResourceResponse = this.resources?.find(x => x.resourceId === this.stickerInfo.actionId);
    if (resource) {
      const shoppingLink: string = resource.shoppingLink;
      if (shoppingLink) {
        if (!shoppingLink.startsWith('http')) {
          // if no protocol is specified, prepend https://
          return 'https://' + shoppingLink;
        }
        return shoppingLink;
      }
    }

    return '';
  }
}
