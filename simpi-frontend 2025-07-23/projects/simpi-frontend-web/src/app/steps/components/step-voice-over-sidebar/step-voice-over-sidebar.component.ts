import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LanguageResponse, SimpiResponse, StepResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { FormGroup } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { Observable } from 'rxjs';
import { SimpiTranslationService } from 'projects/simpi-frontend-common/src/lib/services/translations/simpi-translations.service';

@Component({
  selector: 'sim-step-voice-over-sidebar',
  templateUrl: './step-voice-over-sidebar.component.html',
  styleUrls: ['./step-voice-over-sidebar.component.scss']
})
export class StepVoiceOverSidebarComponent implements OnInit, OnDestroy {

  private _componentActive: boolean = true;

  @Input()
  public simpi: SimpiResponse;

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public stepForm: FormGroup;

  @Output()
  public textBackgroundColorChanged: EventEmitter<void> = new EventEmitter<void>();

  public originalLanguage$: Observable<LanguageResponse>;

  public availableLanguages$: Observable<LanguageResponse[]>;

  public showInput: boolean = false;

  public changingOriginalLanguage: boolean = false;

  public addingTranslationTarget: boolean = false;

  constructor(private translationService: SimpiTranslationService) {}

  public ngOnInit(): void {
    this.translationService.selectSimpi(this.simpi);
    this.originalLanguage$ = this.translationService.originalLanguage$;
    this.availableLanguages$ = this.translationService.availableLanguages$;
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public get textBackgroundColor(): string {
    return this.stepForm?.get('textBackgroundColor')?.value;
  }

  public onTextBackgroundColorChange(event: ColorEvent): void {
    if (!this.stepForm?.get('textBackgroundColor') || !event?.color) {
      return;
    }

    this.stepForm.patchValue({ textBackgroundColor: event.color.hex});
    this.textBackgroundColorChanged.emit();
  }

  public changeOriginalLanguage(language: LanguageResponse): void {
    this.changingOriginalLanguage = true;
    this.translationService.setOriginalLanguage(this.simpi.simpiId, language).subscribe(() => {
      this.changingOriginalLanguage = false;
    });
  }
}
