import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { SimpiTranslationService } from "../../../services/translations/simpi-translations.service";
import {
  LanguageResponse,
  SimpiResponse,
  TranslationTargetResponse,
} from "../../../models";

@Component({
  selector: "sim-translation-panel",
  templateUrl: "./translation-panel.component.html",
  styleUrls: ["./translation-panel.component.scss"],
})
export class TranslationPanelComponent implements OnInit {
  constructor(private translationService: SimpiTranslationService) {}

  public ngOnInit(): void {
    this.translationService.selectSimpi(this.simpi);
    this.originalLanguage$ = this.translationService.originalLanguage$;
    this.translationTargets$ = this.translationService.translationTargets$;
    this.availableLanguages$ = this.translationService.availableLanguages$;
  }

  public nameOfLanguage(language: LanguageResponse): string {
    return language?.name;
  }

  @Input()
  public simpi: SimpiResponse;

  @Output()
  public importClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public exportClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public importMetadataClick: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public exportMetadataClick: EventEmitter<void> = new EventEmitter<void>();

  public originalLanguage$: Observable<LanguageResponse>;

  public translationTargets$: Observable<TranslationTargetResponse[]>;

  public availableLanguages$: Observable<LanguageResponse[]>;

  public showInput: boolean = false;

  public changingOriginalLanguage: boolean = false;

  public addingTranslationTarget: boolean = false;

  public applyingInProgress: boolean = false;

  public changeOriginalLanguage(language: LanguageResponse): void {
    this.changingOriginalLanguage = true;
    this.translationService
      .setOriginalLanguage(this.simpi.simpiId, language)
      .subscribe(() => {
        this.changingOriginalLanguage = false;
      });
  }

  public addTranslationTarget(language: LanguageResponse): void {
    this.addingTranslationTarget = true;
    this.translationService.addTranslationTarget(language).subscribe(() => {
      this.addingTranslationTarget = false;
      this.showInput = false;
    });
  }

  public deleteTranslationTarget(target: TranslationTargetResponse): void {
    target.isChanging = true;
    this.translationService
      .removeTranslationTarget(target.language)
      .subscribe(() => {
        target.isChanging = false;
      });
  }

  public resetTranslationTarget(target: TranslationTargetResponse): void {
    target.isChanging = true;
    this.translationService
      .resetTranslationTarget(target.language)
      .subscribe(() => {
        target.isChanging = false;
      });
  }

  public enableTranslationAdding(): void {
    this.showInput = true;
  }

  public applyTemplate(): void {
    this.applyingInProgress = true;
    this.translationService.applyTemplate(this.simpi.simpiId).subscribe(() => {
        this.applyingInProgress = false;
        this.showInput = false;
      }
    );
  }

  public onExport(event: Event): void {
    event.preventDefault();
    this.exportClick.emit();
  }

  public onImport(event: Event): void {
    event.preventDefault();
    this.importClick.emit();
  }

  public onExportMetadata(event: Event): void {
    event.preventDefault();
    this.exportMetadataClick.emit();
  }

  public onImportMetadata(event: Event): void {
    event.preventDefault();
    this.importMetadataClick.emit();
  }
}
