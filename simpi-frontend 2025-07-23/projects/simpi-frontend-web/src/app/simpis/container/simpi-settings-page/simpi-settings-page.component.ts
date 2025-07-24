import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { SimpiResponse } from '../../../../../../simpi-frontend-common/src/lib/models';
import { UploadImgModalComponent } from '../../../shared/components/upload-img-modal/upload-img-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeWhile, mergeMap, take, single } from 'rxjs/operators';
import { UploadTranslationModalComponent } from '../../../shared/components/upload-translation-modal/upload-translation-modal.component';
import { SimpiTranslationService } from 'projects/simpi-frontend-common/src/lib/services/translations/simpi-translations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { UploadMetadataTranslationModalComponent } from '../../../shared/components/upload-metadata-translation-modal/upload-metadata-translation-modal.component';

@Component({
  template: `
    <sim-simpi-settings [simpi]="simpi$ | async"
                        [showNextButton]="userIsComingFromStepEditor"
                        [uploadImageModalComponent]="uploadImageModalComponent"
                        (navigateBack)="navigateBack()"
                        (onNextClick)="navigateToProductOverview()"
                        (exportTranslationsClick)="exportTranslations()"
                        (importTranslationsClick)="importTranslations()"
                        (exportMetadataTranslationsClick)="exportMetadataTranslations()"
                        (importMetadataTranslationsClick)="importMetadataTranslations()"
                        (aliasChanged)="onAliasChanged($event)">
    </sim-simpi-settings>
  `,
  styles: [``]
})

export class SimpiSettingsPageComponent implements OnInit, OnDestroy {

  private componentActive: boolean = false;

  private brandAlias: string;

  private productAlias: string;

  public simpi$: Observable<SimpiResponse>;

  public userIsComingFromStepEditor: boolean = false;

  public uploadImageModalComponent: typeof UploadImgModalComponent = UploadImgModalComponent;

  constructor(
    private simpiService: SimpiService, private router: Router, private route: ActivatedRoute,
    private translationService: SimpiTranslationService, private modal: NgbModal, private location: Location) {
  }

  public ngOnInit(): void {
    this.componentActive = true;

    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        takeWhile(() => this.componentActive)
      )
      .subscribe(([params, queryParams]) => {
        if (params?.get('simpiAlias')) {
          this.brandAlias = params.get('brandAlias');
          this.productAlias = params.get('productAlias');
          this.simpi$ = this.simpiService.getSimpiByAlias(params.get('simpiAlias'))
            .pipe(map(simpi => {
              simpi.thumbnailUrl = this.simpiService.getThumbnailUrl(simpi.thumbnailId);
              return simpi;
            }));
        }
        this.userIsComingFromStepEditor = !!queryParams?.get('fromStepEditor');
      });
  }

  public ngOnDestroy(): void {
    this.componentActive = false;
  }

  public navigateBack(): void {
    if (this.userIsComingFromStepEditor) {
      this.router.navigate(['../steps'], { relativeTo: this.route }).catch(console.error);
    } else {
      this.router.navigate(['../../..'], { relativeTo: this.route }).catch(console.error);
    }
  }

  public navigateToProductOverview(): void {
    this.router.navigate(['../../..'], { relativeTo: this.route }).catch(console.error);
  }

  public exportTranslations(): void {
    const data$ = this.simpi$.pipe(mergeMap(s => (s.title, this.translationService.exportTranslationCSV(s.simpiId))));
    const title$ = this.simpi$.pipe(map(s => s.title));
    combineLatest(data$, title$).pipe(
      single(),
      map(([data, title]) => this.downloadAsCsvFile(data, title))
    ).subscribe();
  }

  public importTranslations(): void {
    this.simpi$.pipe(
      take(1),
      map(s => {
        const modal = this.modal.open(UploadTranslationModalComponent);
        const component = modal.componentInstance as UploadTranslationModalComponent;
        component.simpi = s
      })
    ).subscribe();
  }

  public exportMetadataTranslations(): void {
    const data$ = this.simpi$.pipe(mergeMap(s => (s.title, this.translationService.exportMetadataTranslationCSV(s.simpiId))));
    const title$ = this.simpi$.pipe(map(s => s.title));
    combineLatest(data$, title$).pipe(
      single(),
      map(([data, title]) => this.downloadAsCsvFile(data, title))
    ).subscribe();
  }

  public importMetadataTranslations(): void {
    this.simpi$.pipe(
      take(1),
      map(s => {
        const modal = this.modal.open(UploadMetadataTranslationModalComponent);
        const component = modal.componentInstance as UploadMetadataTranslationModalComponent;
        component.simpi = s
      })
    ).subscribe();
  }
  public onAliasChanged(newAlias: string): void {
    this.location.replaceState(`/${this.brandAlias}/cockpit/products/${this.productAlias}/simpis/${newAlias}/settings`);
  }

  private downloadAsCsvFile(data: ArrayBuffer, filename: string): void {
    const a = document.createElement('a');
    a.hidden = true;
    a.href = URL.createObjectURL(new Blob( [data], { type: 'text/csv' }));
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click()
    document.body.removeChild(a);
  }
}
