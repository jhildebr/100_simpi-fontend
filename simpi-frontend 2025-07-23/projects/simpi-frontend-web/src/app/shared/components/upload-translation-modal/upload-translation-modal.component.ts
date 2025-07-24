import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { takeWhile, tap, catchError, finalize } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpiTranslationService } from 'projects/simpi-frontend-common/src/lib/services/translations/simpi-translations.service';
import { SimpiResponse, CsvImportError } from 'projects/simpi-frontend-common/src/lib/models';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'sim-upload-translation-modal',
    templateUrl: './upload-translation-modal.component.html',
    styleUrls: ['./upload-translation-modal.component.scss']
})
export class UploadTranslationModalComponent implements OnInit, OnDestroy {

    private _componentActive: boolean;

    public processing: boolean;

    public uploadCompleted: boolean = false;

    public error: CsvImportError;

    @Input()
    public simpi: SimpiResponse;

    public get modalTitle(): string {
        return `Import Translations for ${this.simpi.title}`;
    }

    constructor(public activeModal: NgbActiveModal, private translationService: SimpiTranslationService) {
    }

    public ngOnInit(): void {
        this._componentActive = true;
    }

    public ngOnDestroy(): void {
        this._componentActive = false;
    }

    private uploadTranslation(file: File): void {
        this.error = null;
        this.translationService.importTranslationCSV(this.simpi.simpiId, file)
            .pipe(
                catchError(({ error }) => {
                    this.error = error;
                    return EMPTY;
                }),
                tap(() => {
                    this.uploadCompleted = true;
                }),
                finalize(() => {
                    this.processing = false;
                }),
                takeWhile(() => this._componentActive))
            .subscribe();
    }

    public onFilesToUploadReceived(files: File[]): void {
        if (files.length == 1) {
            this.processing = true;
            this.uploadTranslation(files[0]);
        }
    }
}
