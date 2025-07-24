import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { LanguageResponse } from "projects/simpi-frontend-common/src/lib/models";
import { BrandService } from "projects/simpi-frontend-common/src/lib/services/brand/brand.service";
import { TranslationService } from "projects/simpi-frontend-common/src/lib/services/translations/translations.service";

@Component({
  selector: "sim-corporate-languages",
  templateUrl: "./corporate-languages.component.html",
  styleUrls: ["./corporate-languages.component.scss"],
})
export class CorporateLanguagesComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    private brandService: BrandService
  ) {}

  public addingTranslation: boolean = false;
  public templateTranslations$: Observable<LanguageResponse[]>;

  @Input()
  public availableLanguages$: Observable<LanguageResponse[]>;

  @Input()
  public language: LanguageResponse;

  @Input()
  public brandId: string;

  @Output()
  public languageChanged: EventEmitter<void> = new EventEmitter();

  @Output()
  public languageDeleted: EventEmitter<void> = new EventEmitter();


  @Output()
  public voiceChanged: EventEmitter<{ languageId: string; voice: string }> =
    new EventEmitter();



  public showInput: boolean = false;

  public ngOnInit(): void {
    this.availableLanguages$ = this.translationService.availableLanguages$;
    this.templateTranslations$ = this.brandService.templateTranslations$;
    this.brandService.getTemplateLanguages(this.brandId).subscribe();
  }

  public nameOfLanguage(language: LanguageResponse): string {
    return language?.name;
  }

  public enableTranslationAdding(): void {
    console.log("enableTranslationAdding_component_2");
    this.showInput = true;
  }

  public addTranslation(language: LanguageResponse): void {
    console.log("addTranslation_component");
    this.addingTranslation = true;
    this.brandService
      .addTemplateTranslation(this.brandId, language)
      .subscribe(() => {
        this.addingTranslation = false;
        this.showInput = false;
      });
  }

  onLanguageChanged(): void {
    this.languageChanged.emit();
  }

  onLanguageDeleted(): void {
    this.languageDeleted.emit();
  }

  public deleteTemplateTranslation(target: LanguageResponse): void {
    this.brandService
      .deleteTemplateTranslation(target, this.brandId)
      .subscribe(() => {
        this.languageDeleted.emit();
      });
  }

  public onVoiceChanged(event: { language: LanguageResponse, voice: string }): void {
    console.log(`Voice changed for ${event.language.name} to "${event.voice}"`);
    this.voiceChanged.emit({ 
      languageId: event.language.code, 
      voice: event.voice 
    });
  }
}
