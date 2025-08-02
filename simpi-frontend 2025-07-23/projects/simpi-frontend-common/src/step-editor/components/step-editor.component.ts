import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Vector2 } from '../models/vector2';
import { ScaleStrategy } from './scaleStrategy';
import { CoverScaleStrategy } from './coverScaleStrategy';
import { ContainScaleStrategy } from './containScaleStrategy';
import * as Hammer from 'hammerjs';
import { PORTRAIT_INDICATOR_CENTER, PortraitIndicatorHandler, } from './interaction/portraitIndicatorHandler';
import { InteractionHost } from './interactionHost';
import { Renderer } from './renderers/renderer';
import { PortraitIndicatorRenderer } from './renderers/portraitIndicatorRenderer';
import { Rect } from '../models/rect';
import { InteractionHandler } from './interaction/interactionHandler';
import { StickerInteractionHandler } from './interaction/stickerInteractionHandler';
import { StickerRenderer } from './renderers/stickerRenderer';
import { EditorState, StickerState } from '../models/editorState';
import { adjustRenderingToDevicePixelRatio } from './deviceRenderingUtils';
import {
  MEDIATYPE_IMAGE,
  MEDIATYPE_VIDEO,
  SIMPI_DESCRIPTION_BACKGROUND_COLOR,
  SIMPI_DESCRIPTION_CONTENT,
  SIMPI_DESCRIPTION_EDITING_IN_APP,
  SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS,
} from './editorConstants';
import { HAS_AUDIO, MEDIA_TYPE, MediaInteractionHandler, } from './interaction/mediaInteractionHandler';
import { takeWhile } from 'rxjs/operators';
import { StickerService } from '../../lib/services/stickers/sticker.service';
import { StickerControlsRenderer } from './renderers/stickerControlsRenderer';
import { StickerControlsInteractionHandler } from './interaction/stickerControlsInteractionHandler';
import { AlignmentRenderer } from './renderers/alignmentRenderer';
import { StickerInfo } from '../models/stickerInfo';
import { StickerInfoData } from './sticker-info-popup/sticker-info-popup.component';
import { PROP_CREATE_STICKER, PROP_CREATE_STICKER_TYPE, STICKER_TYPE_TOUCH, STICKERS, } from './common/stickerConfig';
import { Sticker } from '../../lib/models/sticker';
import { StickerActionPopup } from '../models/stickerActionPopup';
import { StickerTrashRenderer } from './renderers/stickerTrashRenderer';
import { TextInteractionHandler } from './interaction/textInteractionHandler';
import { TextRenderer } from './renderers/textRenderer';
import { ColorEvent } from 'ngx-color';
import { Capacitor } from '@capacitor/core';
import { StepMedia } from './stepMedia';
import { EditorPanelType } from '../../lib/models/editor-panel-type';
import { DOCUMENT } from '@angular/common';
import { CUSTOM_STICKER_ID, RESOURCE_STICKER_ID } from '../../lib/services/stickers/simpi-sticker-collection';
import { SimpiContextService } from '../../lib/services/simpi-context/simpi-context.service';
import { StickerSettingsPopupProperties } from '../models/stickerSettingsPopupProperties';
import { StickerSettings } from '../models/stickerSettings';

@Component({
  selector: "sim-step-editor",
  templateUrl: "step-editor.component.html",
  styleUrls: ["step-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorComponent
  implements InteractionHost, AfterViewInit, OnDestroy, OnInit
{

  get visiblePanel(): EditorPanelType {
    return this._visiblePanel;
  }

  @Input()
  set visiblePanel(value: EditorPanelType) {
    this._visiblePanel = value;
    if (this.stickerSettingsPopupProperties) {
      this.stickerSettingsPopupProperties = undefined;
    }
  }

  private tickHandlerTimerId: number;
  private _imageUrl: string = undefined;
  private _videoUrl: string = undefined;

  private _stepId: string = undefined;

  private initialPinchRotation: number = 0;

  private _mediaType: string = undefined;

  private _image: HTMLImageElement;

  private _width: number;

  private _height: number;

  @Input()
  public forceVideoMuted: boolean = false;

  @Input()
  public scaleStrategy: ScaleStrategy;

  private scaleFactor: number;

  private scaleImageOffset: Vector2;

  private imageCenterPoint?: Vector2 = undefined;

  private imageCenterPointTranslation?: Vector2 = undefined;

  private hammerHandle: any = undefined;

  private imageLoaded: boolean = false;

  private interactionHandlers: InteractionHandler[] = [];

  private editorState: EditorState;

  private alignmentRenderer = new AlignmentRenderer();
  private stickerInteractionHandler: StickerInteractionHandler;
  
  // Alignment settings
  public alignmentEnabled: boolean = true;

  // Sticker info popup
  public stickerInfoPopup = {
    visible: false,
    position: { x: 0, y: 0 },
    data: { x: 0, y: 0, scale: 1.0 } as StickerInfoData
  };

  private renderers: Renderer[] = [
    new PortraitIndicatorRenderer(),
    new StickerRenderer(this, this.stickerService),
    new StickerControlsRenderer(this, this.stickerService),
    new StickerTrashRenderer(this, this.stickerService),
    this.alignmentRenderer,
    new TextRenderer(),
  ];

  private _readonly: boolean = false;

  private _active: boolean = true;

  private _debug: boolean = false;

  private cssCursor: string = 'default';

  private requiredCssCursor: string = undefined;

  private properties: any = {};

  private _animationFrameId: number;

  private _destroyed: boolean = false;

  private _clickHandled: boolean = false;

  @ViewChild('cv')
  public canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('video')
  public videoEl: ElementRef<HTMLVideoElement>;

  @ViewChild('inputElement')
  public inputEl: ElementRef<HTMLInputElement>;

  private _platform: string;

  private _readyToRender: boolean = false;

  public get width(): number {
    return this._width;
  }

  @Input('width')
  public set width(value: number) {
    this._width = value || 300;
    if (this.imageLoaded) {
      this.initializeRendering();
    }
    this.setColorPickerWidth();
  }

  public get height(): number {
    return this._height;
  }

  @Input('height')
  public set height(value: number) {
    this._height = value || 200;
    if (this.imageLoaded) {
      this.initializeRendering();
    }
  }

  @Input()
  public set readonly(value: boolean) {
    this._readonly = value;
    if (this.imageLoaded) {
      this.initializeRendering();
    }
  }

  public get readonly(): boolean {
    return this._readonly;
  }

  @Input()
  public mobileApp: boolean = false;

  private _visiblePanel: EditorPanelType = EditorPanelType.NONE;

  private _textEditMode: boolean = false;

  @Input()
  public set textEditMode(value: boolean) {
    if (!this._textEditMode && value) {
      this._textEditMode = value;
      this.inputEl.nativeElement.focus();
    }
    this._textEditMode = value;
    this.setProperty(SIMPI_DESCRIPTION_EDITING_IN_APP, value);
  }

  public get textEditMode(): boolean {
    return this._textEditMode;
  }

  private _isMediaMuted: boolean;

  @Input()
  public set stepId(value: string) {
    this._stepId = value;
  }

  @Input()
  public set isMediaMuted(value: boolean) {
    this.muteMedia(value);
  }

  public get isMediaMuted(): boolean {
    return this._isMediaMuted;
  }

  @Output()
  public videoPlayError: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Though `readonly` and `editModeEnabled` look similar, there is a difference in how they are used:
   * `Readonly` determines the scale strategy (contain vs. cover), if the interaction indicators are
   * visible around stickers, and if the portrait indicator is shown. In contrast, `editModeEnabled`
   * determines if stickers and the portrait indicator can be moved around (i.e., edited).
   */
  @Input()
  public editModeEnabled: boolean = false;

  @Input()
  public set active(value: boolean) {
    this._active = value;
    if (value) {
      // this.playMedia()
      if (this.imageLoaded) {
        this.initializeRendering();
      }
    } else {
      this.stopMedia();
    }
    this.render();
    this.initializeRenderersBeforePlaying();
    this.initializeInteractionHandlers();
  }

  private initializeRenderersBeforePlaying(): void {
    this.renderers.forEach(x => {
      if (x.initializeBeforePlaying) {
        x.initializeBeforePlaying(this);
      }
    });
  }

  private initializeInteractionHandlers(): void {
    this.interactionHandlers.forEach((handler) => {
      handler.initialize(this);
    });
  }

  public get active(): boolean {
    return this._active;
  }

  public get isDebugMode(): boolean {
    return this._debug;
  }

  @Input()
  public longStepDescription: string;

  @Input()
  public simpiTitle: string;

  @Input()
  public simpiDescription: string;

  @Output()
  public componentLoaded: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public mediaLoaded: EventEmitter<void> = new EventEmitter<void>();

  public stickerActionPopup: StickerActionPopup;

  @Output()
  public openShoppingLink: EventEmitter<string> = new EventEmitter<string>();

  constructor(
      @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    private stickerService: StickerService,
    private context: SimpiContextService,
    private cdr: ChangeDetectorRef
  ) {
    this.interactionHandlers.push(new PortraitIndicatorHandler(this));
    this.stickerInteractionHandler = new StickerInteractionHandler(this, this.stickerService);
    this.interactionHandlers.push(this.stickerInteractionHandler);
    this.interactionHandlers.push(
      new StickerControlsInteractionHandler(this, this.stickerService)
    );
    this.interactionHandlers.push(new MediaInteractionHandler(this));
    this.interactionHandlers.push(new TextInteractionHandler());
  }

  @Input('stepMedia')
  public set stepMedia(value: StepMedia) {
    this._mediaType = value?.mediaType;
    this._videoUrl = value?.videoUrl;
    this._imageUrl = value?.imageUrl;

    if (value) {
      if (value.mediaType === MEDIATYPE_VIDEO && !value.videoUrl) {
        // old steps store videoUrl as imageUrl
        this._videoUrl = value.imageUrl;
        this._imageUrl = undefined;
      }

      this.setProperty(MEDIA_TYPE, value?.mediaType);
      this.setProperty(HAS_AUDIO, !!value?.audioUrl);
      this.cdr.detectChanges();

      if (value.mediaType && (value.imageUrl || value.videoUrl)) {
        this.reloadImage();
      }
    }
  }

  public get mediaType(): string {
    return this._mediaType;
  }

  public get videoUrl(): string {
    return this._videoUrl;
  }

  public get imageUrl(): string {
    return this._imageUrl;
  }

  @Input('description')
  public set description(value: string) {
    this.setProperty(SIMPI_DESCRIPTION_CONTENT, value);
    this.cdr.markForCheck();
  }

  public get stepTitleInputValue(): string {
    return this.getProperty(SIMPI_DESCRIPTION_CONTENT) || '';
  }

  public get textBackgroundColor(): string {
    return this.getProperty(SIMPI_DESCRIPTION_BACKGROUND_COLOR);
  }

  public get cursor(): string {
    return this.cssCursor;
  }

  @Input()
  public simpiId: string;

  @Output()
  public onShowStickerActionPopup: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  public onCloseStickerActionPopup: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  public onStickerEditModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onTextEditModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public colorPickerPositionBottom: string;

  public colorPickerWidth: number;

  public stickerSettingsPopupProperties: StickerSettingsPopupProperties = undefined;

  public ngAfterViewInit(): void {
    this.initializeInteraction(this.canvas);
    this.interactionHandlers = this.interactionHandlers.sort(
      (a, b) => b.priority - a.priority
    );

    this.tickHandlerTimerId = window.setInterval(() => {
      if (!this.active) {
        return;
      }

      this.interactionHandlers.forEach((handler) => {
        handler.handleTick(this);
      });
    }, 5);

    this.componentLoaded.emit();

    this.subscribeToContext();
  }

  public updateTitle(newTitle: string): void {
    this.setProperty(SIMPI_DESCRIPTION_CONTENT, newTitle);

    if (this.editorState) {
      this.editorState.textContent = newTitle;
    }

    if (this.inputEl) {
      this.inputEl.nativeElement.value = newTitle;
    }
  }

  public setCursor(cssCursor: string): void {
    this.requiredCssCursor = cssCursor;
  }

  public relativeToImage(vec: Vector2): Vector2 {
    const boundingRect = this.canvas.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY || 0;
    return this.projectPoint(
      new Vector2(vec.x - boundingRect.left, vec.y - boundingRect.top - scrollY)
    );
  }

  // Reverse function of relativeToImage()
  public absoluteOnPage(vec: Vector2): Vector2 {
    const boundingRect = this.canvas.nativeElement.getBoundingClientRect();
    const scrollY = window.scrollY || 0;
    return this.unProjectPoint(vec).add(new Vector2(boundingRect.left, boundingRect.top + scrollY));
  }

  public getBounds(): Rect {
    return new Rect(Vector2.zero(), new Vector2(this.width, this.height));
  }

  public getSimpiContext(): SimpiContextService {
      return this.context;
  }

  public getImageDimensions(): Vector2 {
    if (this._mediaType === MEDIATYPE_IMAGE || this._mediaType === null) {
      if (!this._image) {
        return new Vector2(1, 1);
      }
      return new Vector2(this._image.width, this._image.height);
    } else if (this._mediaType === MEDIATYPE_VIDEO) {
      return new Vector2(
        this.videoEl.nativeElement.videoWidth,
        this.videoEl.nativeElement.videoHeight
      );
    } else {
      this.reportInvalidMediaType();
    }
  }

  public getUnprojectedImageDimensions(): Vector2 {
    return this.getImageDimensions().scale(1 / this.scaleFactor);
  }

  public projectPoint(v: Vector2): Vector2 {
    return v
      .add((this.scaleImageOffset || new Vector2(0, 0)).inv())
      .scale(1 / this.scaleFactor)
      .add(this.imageCenterPointTranslation?.inv() || new Vector2(0, 0));
  }

  // reverse function for projectPoint()
  public unProjectPoint(v: Vector2): Vector2 {
    return v
      .add(this.imageCenterPointTranslation || new Vector2(0, 0))
      .scale( this.scaleFactor)
      .add((this.scaleImageOffset || new Vector2(0, 0)));
  }


  public projectDimensions(v: Vector2): Vector2 {
    return v.scale(1 / this.scaleFactor);
  }

  public getImageToCanvasScaleFactor(): number {
    return this.scaleFactor;
  }

  public ngOnDestroy(): void {
    this._destroyed = true;
    this.cancelAnimation();
    this.deinitializeInteraction();
    window.clearInterval(this.tickHandlerTimerId);
  }

  private cancelAnimation(): void {
    this.zone.runOutsideAngular(() => {
      window.cancelAnimationFrame(this._animationFrameId);
    });
  }

  public setProperty(key: string, value: any): void {
    this.properties[key] = value;
  }

  public getProperty(key: string, defaultValue?: any): any {
    if (this.properties[key] !== undefined) {
      return this.properties[key];
    }

    return defaultValue;
  }

  public onAddSticker(type: number = STICKER_TYPE_TOUCH): void {
    this.setProperty(PROP_CREATE_STICKER, true);
    this.setProperty(PROP_CREATE_STICKER_TYPE, type);
  }

  public importState(state: EditorState): void {
    // TODO: Later, the export should be handled by each handler individually. --mbue
    this.editorState = state;
    this.stickerActionPopup = undefined;
    if (this.imageLoaded) {
      this.applyEditorState();
    }
  }

  public exportState(): EditorState {
    // TODO: Later, the export should be handled by each handler individually. --mbue
    const state = {} as EditorState;
    const w = this.getImageDimensions().x;
    const h = this.getImageDimensions().y;
    const portraitIndicatorCenter = this.getProperty(
      PORTRAIT_INDICATOR_CENTER
    ) as Vector2;
    const stickers = this.getProperty(STICKERS) as StickerInfo[];
    if (portraitIndicatorCenter) {
      state.portraitIndicatorCenter = portraitIndicatorCenter.scaleXY(
        1 / w,
        1 / h
      );
      state.portraitIndicator = undefined;
    }

    state.stickers = stickers.map((s: StickerInfo) => this.convertStickerInfoToStickerState(s,  w, h));

    state.textPositionY = this.getProperty(
      SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS
    );
    state.textBackgroundColor = this.getProperty(
      SIMPI_DESCRIPTION_BACKGROUND_COLOR
    );
    state.textContent = this.getProperty(SIMPI_DESCRIPTION_CONTENT);

    return state;
  }

  public onMouseDown(e: MouseEvent): void {
    if (!this.canvas || !this._active || !this.imageLoaded) {
      return;
    }

    this._clickHandled = false;

    const pos = this.relativeToImage(new Vector2(e.pageX, e.pageY));
    for (const handler of this.interactionHandlers) {
      if (handler.handlePointerDown(this, pos)) {
        break;
      }
    }
  }

  public onMouseMove(e: MouseEvent): void {
    if (!this.canvas || !this._active || !this.imageLoaded) {
      return;
    }

    this.requiredCssCursor = undefined;

    const pos = this.relativeToImage(new Vector2(e.pageX, e.pageY));
    for (const handler of this.interactionHandlers) {
      if (handler.handlePointerHover(this, pos)) {
        break;
      }
    }

    if (this.requiredCssCursor) {
      this.cssCursor = `${this.requiredCssCursor}`;
    } else {
      this.cssCursor = 'default';
    }
  }

  private onDoubleTap(e: HammerInput): void {
    if (!this.canvas || !this._active || !this.imageLoaded) {
      return;
    }

    const pos = this.relativeToImage(new Vector2(e.center.x, e.center.y));
    for (const handler of this.interactionHandlers) {
      if (handler.handleDoubleClick(this, pos)) {
        break;
      }
    }
  }

  public onClick(e: MouseEvent): void {
    if (
      !this.canvas ||
      !this._active ||
      !this.imageLoaded ||
      this._clickHandled
    ) {
      return;
    }

    if(this._visiblePanel === EditorPanelType.TEXT && this.editModeEnabled) {
        this.inputEl.nativeElement.focus();
    }

    if(this.stickerSettingsPopupProperties) {
      this.stickerSettingsPopupProperties.stickerSettingsPopupVisible = false;
    }

    const pos = this.relativeToImage(new Vector2(e.pageX, e.pageY));
    for (const handler of this.interactionHandlers) {
      if (handler.handleClick(this, pos)) {
        break;
      }
    }
  }

  private reloadImage(): void {
    const onLoadedMedia = () => {
      this.imageLoaded = true;
      this.mediaLoaded.emit();

      if (!this.editorState) {
        this.editorState = {
          portraitIndicatorCenter: new Vector2(0.5, 0.5),
        };
      }
      this.applyEditorState();

      this.initializeRenderersBeforePlaying();
      this.initializeInteractionHandlers();

      this.initializeRendering();

      this._readyToRender = true;
      this.render();
    };

    if (this._mediaType === MEDIATYPE_IMAGE || this._mediaType === null) {
      this._image = new Image();
      this._image.onload = onLoadedMedia;
      this._image.src = this._imageUrl;
    } else if (this._mediaType === MEDIATYPE_VIDEO) {
      if (!this.videoEl) {
        return;
      }
      this.videoEl.nativeElement.onloadeddata = onLoadedMedia;
      this.videoEl.nativeElement.autoplay = false;
      this.videoEl.nativeElement.muted = true;
      this.videoEl.nativeElement.loop = false;
      this.videoEl.nativeElement.src = this._videoUrl;
      this.videoEl.nativeElement.load();
    } else {
      this.reportInvalidMediaType();
    }
  }

  private play(media: HTMLMediaElement, fromBeginning: boolean = true): boolean {
    if (!media) {
      return false;
    }

    if (media.readyState >= media.HAVE_ENOUGH_DATA) {
      // video should be played and is buffered already (can play through)
      if (fromBeginning) {
        media.pause();
        media.currentTime = 0; // start from beginning (e.g., if video should be played a second time)
      }
      media.muted = this.forceVideoMuted || !this.context.isFirstStep;

      media.play()
        .then(() => {
            this.context.videoHasStarted();
        })
        .catch((error) => {
          console.error("Error playing media: " + error);
          this.videoPlayError.emit(error);
      });
    } else {
      // video should be played but is not loaded yet (e.g. slow internet connection)

      // Safari on iOS only starts loading the video after play() is called.
      // However, in some situations the call to play() fails because the video
      // is not available (DOMException: 'Failed to load because no supported source was found').
      // In this case, the promsise returned by the play() function is rejected.
      // Nevertheless, the video is loaded in the background after the first call to play().
      // Therefore, the video can then be played as soon as enough data is loaded (oncanplay event).
      if (media.readyState === 0) {
        media.autoplay = true;
      } else {
        media.play()
          .then(() => {
            this.context.videoHasStarted();
          })
          .catch(() => {
          media.oncanplay = () => {
            media.play()
              .then(() => {
                this.context.videoHasStarted();
              })
              .catch((error) => {
                console.error("Error playing media: " + error);
                this.videoPlayError.emit(error)
            });
          };
        });
      }
    }
  }

  private pause(media: HTMLMediaElement): boolean {
    if (!media) {
      return false;
    }

    media.pause();
    return true;
  }

  private stop(media: HTMLMediaElement): boolean {
    if (!media) {
      return false;
    }

    media.pause();
    media.currentTime = 0;
    return true;
  }

  private mute(media: HTMLMediaElement, muted: boolean): void {
    if (media) {
      media.muted = muted;
    }
  }

  public playMedia() : void {
    // console.debug("Playing media");
    this.play(this.videoEl?.nativeElement);
  }

  public pauseMedia() : void {
    // console.debug("Pausing media");
    this.pause(this.videoEl?.nativeElement);
  }

  public stopMedia() : void {
    // console.debug("Stopping media");
    this.stop(this.videoEl?.nativeElement);
  }

  public resumeMedia() : void {
    // console.debug("Resuming media");
    this.play(this.videoEl?.nativeElement, false);
  }

  public muteMedia(muted: boolean) : void {
    // console.debug(muted ? "Muting media" : "Unmuting media");
    this.mute(this.videoEl?.nativeElement, muted);
    this._isMediaMuted = muted;
  }

  public onVideoEnded(): void {
    this.context.videoHasEnded();
  }

  private initializeRendering(): void {
    if (!this.imageLoaded) {
      return;
    }

    const canvasDims = new Vector2(this.width, this.height);

    let imageDims: Vector2;
    if (this._mediaType === MEDIATYPE_IMAGE || this._mediaType === null) {
      imageDims = new Vector2(this._image.width, this._image.height);
    } else if (this._mediaType === MEDIATYPE_VIDEO) {
      imageDims = new Vector2(
        this.videoEl.nativeElement.videoWidth,
        this.videoEl.nativeElement.videoHeight
      );
    } else {
      this.reportInvalidMediaType();
    }

    this.imageCenterPoint = this.getProperty(
      PORTRAIT_INDICATOR_CENTER,
      undefined
    ) as Vector2;

    this.scaleStrategy = this.scaleStrategy ?? (this.readonly ? new CoverScaleStrategy() : new ContainScaleStrategy());

    this.scaleFactor = this.scaleStrategy.calculateScaleFactor(
      canvasDims,
      imageDims
    );
    this.scaleImageOffset = this.scaleStrategy.calculateOffset(
      canvasDims,
      imageDims
    );
  }

  private render(): void {
    if (!this._readyToRender) {
      return;
    }

    // Don't render if image is not loaded yet
    if (!this.imageLoaded) {
      return;
    }

    if (this._animationFrameId) {
      this.cancelAnimation();
    }
    const context: CanvasRenderingContext2D =
      this.canvas.nativeElement.getContext("2d");

    adjustRenderingToDevicePixelRatio(
      this.canvas.nativeElement,
      this.width,
      this.height
    );

    context.clearRect(0, 0, this.width, this.height);

    context.save();
    context.translate(this.scaleImageOffset.x, this.scaleImageOffset.y);
    context.scale(this.scaleFactor, this.scaleFactor);

    if (this.imageCenterPoint) {
      const viewportDims = new Vector2(this.width, this.height);
      const imageDims = this.getImageDimensions();
      const maxTrans: Vector2 = imageDims
        .add(viewportDims.scale(1 / this.scaleFactor).inv())
        .abs()
        .scale(0.5);

      const maxTransRect = new Rect(maxTrans.inv(), maxTrans);
      this.imageCenterPointTranslation = new Vector2(
        -this.imageCenterPoint.x + this.getImageDimensions().x / 2,
        -this.imageCenterPoint.y + this.getImageDimensions().y / 2
      ).constraintIn(maxTransRect);
      context.translate(
        this.imageCenterPointTranslation.x,
        this.imageCenterPointTranslation.y
      );
    }

    if (this._mediaType === MEDIATYPE_IMAGE || this._mediaType === null) {
      if (this._image) {
        context.drawImage(this._image, 0, 0);
      }
    } else if (this._mediaType === MEDIATYPE_VIDEO) {
      if (this.videoEl?.nativeElement) {
        context.drawImage(this.videoEl.nativeElement, 0, 0);
      }
    }

    if (this._active) {
      // Update alignment renderer with current guidelines
      this.alignmentRenderer.setGuidelines(this.stickerInteractionHandler.currentAlignmentGuidelines);
      
      this.renderers.forEach((renderer) => {
        renderer.renderInImageSpace(this, context);
      });
    }

    context.restore();

    if (this._active) {
      this.renderers.forEach((renderer) => {
        renderer.renderInScreenSpace(this, context);
      });
    }

    if (this._active && !this._destroyed) {
      this._animationFrameId = this.zone.runOutsideAngular(() =>
        requestAnimationFrame(() => {
          this.render();
          return;
        })
      );
    }
  }

  public ngOnInit(): void {
    this._platform = Capacitor.getPlatform();
    this.setColorPickerWidth();
    window.onbeforeunload = () => this.ngOnDestroy();

    this.stickerService
      .getAddStickerObservable()
      .pipe(takeWhile(() => !this._destroyed))
      .subscribe((sticker) => {
        if (this._active && !this.readonly && this.editModeEnabled) {
          this.createSticker(sticker);
        }
      });
    this.stickerService
      .stickerDropped$
      .pipe(takeWhile(() => !this._destroyed))
      .subscribe((ev) => {
        if (this._active && !this.readonly && this.editModeEnabled) {
            const { stickerId, position } = ev;
            const convertedPosition = this.relativeToImage(position);
            const { x: width } = this.getImageDimensions();
            if(convertedPosition.x > 0 && convertedPosition.x < width) {
              if (stickerId === CUSTOM_STICKER_ID)
              {
                const sticker: Sticker = {
                  id: stickerId,
                  actionId: ev.actionId,
                  previewImageId: ev.previewImageId,
                  hasBubble: false
                };
                this.createSticker(sticker, convertedPosition);
              }
              else if(stickerId !== RESOURCE_STICKER_ID)
              {
                this.createSticker(this.stickerService.getStickerById(stickerId), convertedPosition);
              }
              else {
                const sticker: Sticker = {
                  id: stickerId,
                  actionId: ev.actionId,
                  previewImageId: ev.previewImageId,
                  hasBubble: true,
                  actionType: "resource",
                }
                this.createSticker(sticker, convertedPosition);
              }
            }
        }
      });

  }

  private deinitializeInteraction(): void {
    if (!this.hammerHandle) {
      return;
    }

    this.hammerHandle.off("panstart");
    this.hammerHandle.off("panmove");
    this.hammerHandle.off("panend");
    this.hammerHandle.off("pinchstart");
    this.hammerHandle.off("pinchmove");
    this.hammerHandle.off("rotatestart");
    this.hammerHandle.off("rotatemove");
    this.hammerHandle.off("doubletap");
    this.hammerHandle = undefined;
  }

  private initializeInteraction(canvasElementRef: ElementRef): void {
    if (!canvasElementRef) {
      return;
    }

    this.hammerHandle = new Hammer(canvasElementRef.nativeElement, {});
    this.hammerHandle.get("pinch").set({ enable: true });
    this.hammerHandle.get("rotate").set({ enable: true });
    this.hammerHandle.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    this.hammerHandle.on("panstart", (e: HammerInput) => {
      const pos = this.relativeToImage(
        new Vector2(e.center.x, e.center.y + window.scrollY)
      );
      this.handlePointerDown(pos);
    });
    this.hammerHandle.on("panmove", (e: HammerInput) => {
      const pos = this.relativeToImage(
        new Vector2(e.center.x, e.center.y + window.scrollY)
      );
      this.handlePointerDrag(pos);
    });
    this.hammerHandle.on("panend", (e: HammerInput) => {
      const pos = this.relativeToImage(
        new Vector2(e.center.x, e.center.y + window.scrollY)
      );
      this.handlePointerUp(pos);
    });
    this.hammerHandle.on("pinchstart", (e: HammerInput) => {
      const pos = this.relativeToImage(
        new Vector2(e.center.x, e.center.y + window.scrollY)
      );
      this.handlePinchStart(pos);
    });
    this.hammerHandle.on("pinchmove", (e: HammerInput) => {
      this.handlePinchMove(e.scale);
    });
    this.hammerHandle.on("pinchend", (e: HammerInput) => {
      this.handlePinchEnd();
    });
    this.hammerHandle.on("pinchcancel", (e: HammerInput) => {
      this.handlePinchEnd();
    });
    this.hammerHandle.on("rotatestart", (e: HammerInput) => {
      const pos = this.relativeToImage(
        new Vector2(e.center.x, e.center.y + window.scrollY)
      );
      this.handleRotateStart(e.rotation, pos);
    });
    this.hammerHandle.on("rotatemove", (e: HammerInput) => {
      this.handleRotateMove(e.rotation);
    });
    this.hammerHandle.on("rotateend", (e: HammerInput) => {
      this.handleRotateEnd();
    });
    this.hammerHandle.on("rotatecancel", (e: HammerInput) => {
      this.handleRotateEnd();
    });
    this.hammerHandle.on("doubletap", (e: HammerInput) => {
      this.onDoubleTap(e);
    });
  }

  private handlePointerDown(pos: Vector2): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePointerDown(this, pos)) {
        break;
      }
    }
  }

  private handlePointerUp(pos: Vector2): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePointerUp(this, pos)) {
        this._clickHandled = true;
        break;
      }
    }
  }

  private handlePointerDrag(pos: Vector2): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePointerDrag(this, pos)) {
        break;
      }
    }
  }

  private handlePinchStart(centerPos: Vector2): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePinchStart(this, centerPos)) {
        break;
      }
    }
  }

  private handlePinchMove(scale: number): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePinchMove(this, scale)) {
        break;
      }
    }
  }

  private handlePinchEnd(): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handlePinchEnd(this)) {
        break;
      }
    }
  }

  private handleRotateStart(rotationDegrees: number, centerPos: Vector2): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    this.initialPinchRotation = rotationDegrees;
    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handleRotationStart(this, centerPos)) {
        break;
      }
    }
  }

  private handleRotateMove(rotationDegrees: number): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    const rotationDelta: number = rotationDegrees - this.initialPinchRotation;
    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handleRotationMove(this, rotationDelta)) {
        break;
      }
    }
  }

  private handleRotateEnd(): void {
    if (this.readonly || !this.editModeEnabled) {
      return;
    }

    for (const interactionHandler of this.interactionHandlers) {
      if (interactionHandler.handleRotationEnd(this)) {
        break;
      }
    }
  }

  private reportInvalidMediaType() {
    console.error(`Invalid media type specified: '${this._mediaType}'`);
  }

  private createSticker(sticker: Sticker, position: Vector2 = undefined) {
    const stickers = this.getProperty(STICKERS);
    const stickerInfo = new StickerInfo();
    stickerInfo.pos = position ? position : this.getImageDimensions().scale(0.5);
    stickerInfo.time = 0;
    stickerInfo.type = sticker.id;
    stickerInfo.actionId = sticker.actionId;
    stickerInfo.actionType = sticker.actionType;
    stickerInfo.previewImageId = sticker.previewImageId;
    stickerInfo.customAnimations = sticker.defaultAnimations || {};
    stickerInfo.realHand = sticker.realHand;
    stickerInfo.supportedAnimations = sticker.supportedAnimations;
    stickerInfo.isVideo = sticker.isVideo;
    stickerInfo.appearanceDelayInMilliseconds = 0;
    stickerInfo.showPopUpEffect = true;
    stickers.push(stickerInfo);
    this.setProperty(STICKERS, stickers);
  }

  private applyEditorState(): void {
    const state: EditorState = this.editorState;

    const w = this.getImageDimensions().x;
    const h = this.getImageDimensions().y;
    if (state.portraitIndicatorCenter) {
      if (
        state.portraitIndicatorCenter.x === 0 &&
        state.portraitIndicatorCenter.y === 0
      ) {
        state.portraitIndicatorCenter = new Vector2(0.5, 0.5);
      }
      this.setProperty(
        PORTRAIT_INDICATOR_CENTER,
        state.portraitIndicatorCenter.scaleXY(w, h)
      );
    } else {
      this.setProperty(
        PORTRAIT_INDICATOR_CENTER,
        this.getImageDimensions().scaleXY(0.5, 0.5)
      );
    }

    if (state.stickers) {
      const stickers = state.stickers.map((s) => {
        const sticker = this.stickerService.getStickerById(s.type);
        return {
          pos: s.position.scaleXY(w, h),
          type: s.type,
          time: -20,
          rotationAngle: s.rotationAngle || 0,
          scaleFactor: s.scaleFactor || 1,
          actionId: s.actionId,
          actionType: s.actionType,
          actionTargetUrl: s.actionTargetUrl,
          previewImageId: s.previewImageId,
          customAnimations: s.customAnimations,
          supportedAnimations: sticker?.supportedAnimations,
          realHand: sticker?.realHand,
          isVideo: sticker?.isVideo ?? false,
          appearanceDelayInMilliseconds: s.appearanceDelayInMilliseconds,
          showPopUpEffect: s.showPopUpEffect,
        } as StickerInfo;
      });
      this.setProperty(STICKERS, stickers);
    }

    this.setProperty(
      SIMPI_DESCRIPTION_VERTICAL_RELATIVE_POS,
      state.textPositionY
    );

    this.setProperty(
      SIMPI_DESCRIPTION_BACKGROUND_COLOR,
      state.textBackgroundColor
    );

    this.setProperty(
      SIMPI_DESCRIPTION_CONTENT,
      state.textContent
    );
  }

  public showStickerActionPopup(stickerActionPopup: StickerActionPopup): void {
    this.stickerActionPopup = stickerActionPopup;
    this.stickerActionPopup.open = true;
    this.onShowStickerActionPopup.emit();
  }

  public showStickerSettingsPopup(stickerInfo: StickerInfo, settingsControlCenterPoint: Vector2): void {
    const height: number = stickerInfo.actionType === 'resource' ? 255 : 200;
    const popUpSize: Vector2 = new Vector2(300, height);
    const popUpSizeRect: Rect = new Rect(Vector2.zero(), popUpSize);

    // if pop up position should be relative to sticker, use the following line of code:
    // const stickerSettingsPopupPositionTopLeft = this.absoluteOnPage(settingsControlCenterPoint).add(new Vector2(0, popUpSize.height).inv());

    // Otherwise, to make pop up position center on the canvas, use the following four lines of code:
    const boundingRect: DOMRect = this.canvas.nativeElement.getBoundingClientRect();
    const scrollY: number = window.scrollY || 0;
    const offset: Vector2 = new Vector2(boundingRect.left, boundingRect.top + scrollY);
    const popupPositionTopLeft: Vector2 = this.getBounds().center.add(offset).add(popUpSizeRect.center.inv());

    this.stickerSettingsPopupProperties = new StickerSettingsPopupProperties(stickerInfo, popupPositionTopLeft, popUpSize);
  }

  public closeStickerSettingsPopup(): void {
    this.stickerSettingsPopupProperties = undefined;
  }

  public onCloseResourcePreview(): void {
    this.stickerActionPopup.open = false;
    this.onCloseStickerActionPopup.emit();
  }

  public toggleStickerEditMode(active: boolean): void {
    this.onStickerEditModeChanged.emit(active);
  }

  public stepTitleInputValueChanged(e: InputEvent): void {
    const current = <string>this.getProperty(SIMPI_DESCRIPTION_CONTENT, '');
    let target = e.currentTarget as HTMLInputElement;
    // Cursor is always displayed at the end so we need to insert and delete there
    switch (e.inputType) {
      // https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes
      case 'insertText':
        target.value = current + e.data;
        e.preventDefault();
        break;
      case 'deleteContent':
      case 'deleteContentBackward':
        target.value = current.slice(0, -1);
        e.preventDefault();
        break;
      case 'historyUndo':
      case 'historyRedo':
        break;
      default:
        target.value = current;
        e.preventDefault();
        break;
    }
    this.setProperty(
      SIMPI_DESCRIPTION_CONTENT,
      target.value
    );
  }

  public toggleTextEditMode(enable: boolean): void {
    if (this._textEditMode !== enable) {
      this.onTextEditModeChanged.emit(enable);
    }
  }

  public stepTitleInputKeyPress(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      this.setProperty(
        SIMPI_DESCRIPTION_CONTENT,
        this.inputEl.nativeElement.value
      );
      this.description = this.inputEl.nativeElement.value;
      this._textEditMode = false;
      this.inputEl.nativeElement.blur();
      this.onTextEditModeChanged.emit(false);
    }
  }

  onColorChange(event: ColorEvent) {
    this.setProperty(SIMPI_DESCRIPTION_BACKGROUND_COLOR, event.color.hex);
  }

  @HostListener("window:ionKeyboardDidShow", ["$event"])
  public keyboardShowEvent(event: any): void {
    if (this._platform === "ios") {
      this.colorPickerPositionBottom = event.detail.keyboardHeight + 20 + "px";
    } else {
      this.colorPickerPositionBottom = "60px";
    }
  }

  @HostListener("window:ionKeyboardDidHide", ["$event"])
  public keyboardHideEvent(event: any): void {
    this.colorPickerPositionBottom = "60px";
  }

  public onStickerSettingsChanged(newStickerSettings: StickerSettings): void {
    if (!newStickerSettings) {
      return;
    }

    const stickers: StickerInfo[] = this.getProperty(STICKERS, []) as StickerInfo[];
    const stickerToChange = stickers.find(x => StickerInfo.areStickerPropertiesEqual(x, this.stickerSettingsPopupProperties.stickerInfo));
    stickerToChange.appearanceDelayInMilliseconds = newStickerSettings.appearanceDelayInMilliseconds;
    stickerToChange.showPopUpEffect = newStickerSettings.showPopUpEffect;
    stickerToChange.actionTargetUrl = newStickerSettings.actionTargetUrl;
    stickerToChange.scaleFactor = newStickerSettings.scaleFactor;
    this.setProperty(STICKERS, stickers);
    this.stickerSettingsPopupProperties = undefined;
  }

  private setColorPickerWidth() {
    this.colorPickerWidth =
      this._platform === "ios" ? this._width - 80 : this._width - 20;
  }

  private subscribeToContext(): void {
    this.context.restartVideo$.pipe(takeWhile(() => !this._destroyed)).subscribe(() => {
      if (this.context.stepId === this._stepId) {
        this.playMedia();
        console.log(`restartVideo$ with videoUrl: ${this.videoUrl}`);
      }
    });

    this.context.resumeVideo$.pipe(takeWhile(() => !this._destroyed)).subscribe(() => {
      if (this.context.stepId === this._stepId) {
        this.resumeMedia();
      }
    });

    this.context.pauseVideo$.pipe(takeWhile(() => !this._destroyed)).subscribe(() => {
      if (this.context.stepId === this._stepId) {
        this.pauseMedia();
      }
    });

    this.context.scaleStrategy$.pipe(takeWhile(() => !this._destroyed)).subscribe((value) => {
      if (!this.readonly) {
        this.scaleStrategy = new ContainScaleStrategy();
        return;
      }

      if (value === 'scaleStrategyContains') {
        this.scaleStrategy = new ContainScaleStrategy();
      } else {
        this.scaleStrategy = new CoverScaleStrategy();
      }
    });
  }

  private convertStickerInfoToStickerState(stickerInfo: StickerInfo, imageWidth: number, imageHeight: number): StickerState {
    return {
      position: stickerInfo.pos.scaleXY(1 / imageWidth, 1 / imageHeight),
      type: stickerInfo.type,
      rotationAngle: stickerInfo.rotationAngle || 0,
      scaleFactor: stickerInfo.scaleFactor || 1,
      actionId: stickerInfo.actionId,
      actionType: stickerInfo.actionType,
      actionTargetUrl: stickerInfo.actionTargetUrl,
      previewImageId: stickerInfo.previewImageId,
      customAnimations: stickerInfo.customAnimations,
      appearanceDelayInMilliseconds: stickerInfo.appearanceDelayInMilliseconds,
      showPopUpEffect: stickerInfo.showPopUpEffect,
    } as StickerState;
  }

  /**
   * Shows the sticker info popup with current position and scale
   */
  public showStickerInfoPopup(mousePos: Vector2, stickerPos: Vector2, scale: number, rotation: number = 0): void {
    // Position popup offset from mouse cursor
    this.stickerInfoPopup.position = {
      x: mousePos.x + 20, // Offset to the right
      y: mousePos.y - 60  // Offset above cursor
    };

    // Update sticker data
    this.stickerInfoPopup.data = {
      x: stickerPos.x,
      y: stickerPos.y,
      scale: scale,
      rotation: rotation
    };

    this.stickerInfoPopup.visible = true;
  }

  /**
   * Updates the sticker info popup data
   */
  public updateStickerInfoPopup(mousePos: Vector2, stickerPos: Vector2, scale: number, rotation: number = 0): void {
    if (this.stickerInfoPopup.visible) {
      // Update popup position to follow mouse
      this.stickerInfoPopup.position = {
        x: mousePos.x + 20,
        y: mousePos.y - 60
      };

      // Update sticker data
      this.stickerInfoPopup.data = {
        x: stickerPos.x,
        y: stickerPos.y,
        scale: scale,
        rotation: rotation
      };
    }
  }

  /**
   * Hides the sticker info popup
   */
  public hideStickerInfoPopup(): void {
    this.stickerInfoPopup.visible = false;
  }
}
