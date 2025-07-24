import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LanguageResponse } from '../../models';
import { BrandService } from '../../services/brand/brand.service';

@Component({
  selector: 'sim-language-input',
  templateUrl: './language-input.component.html',
  styleUrls: ['./language-input.component.scss']
})
export class LanguageInputComponent implements OnInit {
  @Input()
  public allowDelete: boolean = false;

  @Input()
  public autoTranslated: boolean = null;

  @Input()
  public autoTranslatedMetadata: boolean = null;

  @Input()
  public outdated: boolean = false;

  @Input()
  public outdatedMetadata: boolean = false;

  @Input()
  public loading: boolean = false;

  @Input()
  public language: LanguageResponse;

  @Input()
  public choices: LanguageResponse[];

  @Input()
  public showVoice: boolean = false;

  @Input()
  public brandId: string;

  @Output()
  public languageChange: EventEmitter<LanguageResponse> = new EventEmitter();

  @Output()
  public delete: EventEmitter<void> = new EventEmitter();

  @Output()
  public reset: EventEmitter<void> = new EventEmitter();

  @Output()
  public voiceChange: EventEmitter<{ language: LanguageResponse, voice: string }> = new EventEmitter();

  public languageVoice: string;
  public showVoiceSelector: boolean = false;
  public availableVoices: string[] = [];

  public get editable(): boolean {
    if (this.choices) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    if (this.language && this.brandId && this.showVoice) {
      this.loadVoiceForLanguage();
      this.loadAvailableVoices(this.language);
    }
  }

  private loadVoiceForLanguage(): void {
    this.brandService.getVoiceForLanguage(this.brandId, this.language.code).subscribe(
      voice => {
        this.languageVoice = voice;
      }
    );
  }

  private loadAvailableVoices(language: LanguageResponse): void {
    this.brandService.getAvailableVoices(language).subscribe(voices => {
      this.availableVoices = voices;
    });
  }

  public onSelectedChange(newValue: LanguageResponse): void {
    this.languageChange.emit(newValue);
  }

  public toggleVoiceSelector(): void {
    this.showVoiceSelector = !this.showVoiceSelector;
  }

  public selectVoice(voice: string): void {
    this.brandService.setVoiceForLanguage(this.brandId, this.language.code, voice)
      .subscribe(success => {
        if (success) {
          this.languageVoice = voice;
          this.voiceChange.emit({
            language: this.language,
            voice: voice
          });
          this.showVoiceSelector = false;
        }
      });
  }
}
