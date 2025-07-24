import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { fromEvent, merge, Observable, Subscription } from "rxjs";
import { debounceTime, takeWhile, tap } from "rxjs/operators";
import {
  SimpiResponse,
  StepResponse,
} from "../../../../../../simpi-frontend-common/src/lib/models";
import { StepEditorComponent } from "projects/simpi-frontend-common/src/step-editor/components/step-editor.component";
import {
  EditorState,
  editorStateFromStepResponse,
} from "../../../../../../simpi-frontend-common/src/step-editor/models/editorState";
import { MEDIATYPE_VIDEO } from "projects/simpi-frontend-common/src/step-editor/components/editorConstants";
import { EditorPanelType } from "../../../../../../simpi-frontend-common/src/lib/models/editor-panel-type";
import { SimpiContextService } from '../../../../../../simpi-frontend-common/src/lib/services/simpi-context/simpi-context.service';
import { STEP_MEDIA_TYPE_LEGACYVIDEO, STEP_MEDIA_TYPE_VIDEO } from "projects/simpi-frontend-common/src/lib/shared/constants";

@Component({
  selector: "sim-step-details",
  templateUrl: "./step-details.component.html",
  styleUrls: ["./step-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked
{
  private _resize$: Observable<Event>;
  private _orientationChange$: Observable<Event>;
  private _resizeSubscription$: Subscription;
  private _componentActive: boolean = false;

  public simpiImgWidth: number = 0;
  public simpiImgHeight: number = 0;

  public isSidebarVisible: boolean = false;
  public visiblePanel: EditorPanelType = EditorPanelType.NONE;
  public visiblePanelTypes: typeof EditorPanelType = EditorPanelType;

  @ViewChild("editor")
  public stepEditor: StepEditorComponent;

  @ViewChild("stepEditorContainer")
  public stepEditorContainer: ElementRef<HTMLDivElement>;

  @Input()
  public simpi: SimpiResponse;

  @Input()
  public selectedStep: StepResponse;

  @Input()
  public errorLoadingData: boolean;

  @Input()
  public stepForm: FormGroup;

  @Output()
  public reloadData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public stepMediaChanged: EventEmitter<File> = new EventEmitter<File>();

  @Output()
  public stepMediaUploaded: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public saveSelectedStep: EventEmitter<EditorState> = new EventEmitter<EditorState>();

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone, private context: SimpiContextService) {}

  public ngOnInit(): void {}

  public ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  public ngAfterViewInit(): void {
    this._resize$ = fromEvent(window, "resize");
    this._orientationChange$ = fromEvent(window, "orientationchange");
    this._resizeSubscription$ = merge(this._resize$, this._orientationChange$)
      .pipe(
        debounceTime(100),
        tap(() => {
          this.recalculateEditorDimensions();
        }),
        takeWhile(() => this._componentActive)
      )
      .subscribe();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        const change = changes[propName];
        if (propName === "selectedStep" && change?.currentValue) {
          this.cdr.detectChanges();
          this.importSelectedStepState();
          this.initializeContext();
          if (this.errorLoadingData === false) {
            this.recalculateEditorDimensions();
          }
        }
      }
    }
  }

  public onTitleChanged(newTitle: string): void {
    this.stepForm.patchValue({ title: newTitle });
    this.stepEditor?.updateTitle(newTitle);
  }

  public onStepMediaUploaded(newStepMediaId: string): void {
    this.stepMediaUploaded.emit(newStepMediaId);
  }

  public stepEditorLoaded(): void {
    if (this.selectedStep?.mediaType === MEDIATYPE_VIDEO) {
      this.context.playVideo();
    }
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
    this._resizeSubscription$.unsubscribe();
  }

  private recalculateEditorDimensions(): void {
    this.simpiImgHeight = this.stepEditorContainer.nativeElement.clientHeight;
    this.simpiImgWidth = this.stepEditorContainer.nativeElement.clientWidth;
  }

  private importSelectedStepState(): void {
    if (this.stepEditor) {
      const editorState = editorStateFromStepResponse(this.selectedStep);
      this.stepEditor.importState(editorState);
    }
  }

  private initializeContext(): void {
    if (!this.simpi || !this.selectedStep) {
      return;
    }

    const hasVideo = this.selectedStep.mediaType?.toLowerCase() === STEP_MEDIA_TYPE_VIDEO || this.selectedStep.mediaType?.toLowerCase() === STEP_MEDIA_TYPE_LEGACYVIDEO;
    this.context.initialize(hasVideo,
      this.selectedStep.audioUrl,
      this.selectedStep.stepId,
      this.simpi.simpiId,
      false,
      this.selectedStep?.positionIndex === 0);
  }

  public uploadStepMedia(files: File[]): void {
    if (files?.length !== 1) {
      return;
    }

    this.stepMediaChanged.emit(files[0]);
  }

  public showMediaSidebar(): void {
    this.showSidebar(EditorPanelType.MEDIA);
  }

  public showTextSidebar(): void {
    this.showSidebar(EditorPanelType.TEXT);
  }

  public showStickerSidebar(): void {
    this.showSidebar(EditorPanelType.STICKERS);
  }

  public showVoiceOverSidebar(): void {
    this.showSidebar(EditorPanelType.VOICE_OVER);
  }

  public showPortraitViewSidebar(): void {
    this.showSidebar(EditorPanelType.PORTRAIT_INDICATOR);
  }

  public showTranslationViewSidebar(): void {
    this.showSidebar(EditorPanelType.TRANSLATION);
  }

  private showSidebar(type: EditorPanelType): void {
    if (this.visiblePanel == type) {
      this.closeAllSidebars();
    } else {
      this.visiblePanel = type;
      this.isSidebarVisible = true;
      window.setTimeout(() => this.recalculateEditorDimensions(), 100);
    }
  }

  public closeAllSidebars(): void {
    this.visiblePanel = EditorPanelType.NONE;
    this.isSidebarVisible = false;
    window.setTimeout(() => this.recalculateEditorDimensions(), 100);
  }

  public toggleSound(): void {
    this.closeAllSidebars();
  }

  public textBackgroundColorChanged(): void {
    if (this.stepEditor) {
      const editorState = this.stepEditor.exportState();
      editorState.textBackgroundColor = this.stepForm.get(
        "textBackgroundColor"
      ).value;
      this.stepEditor.importState(editorState);
    }
  }

  public onSaveStep(): void {
    this.saveSelectedStep.emit(this.stepEditor.exportState());
    this.closeAllSidebars();
  }

  public getEditorState(): EditorState {
    return this.stepEditor?.exportState();
  }
}
