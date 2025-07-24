import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HapticsImpactStyle, Plugins } from '@capacitor/core';
import { IonContent, IonSlides, ModalController, Platform, ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { concat, EMPTY, from, interval, Observable, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  catchError,
  combineAll,
  concatMap,
  finalize,
  map,
  mapTo,
  mergeMap,
  scan,
  startWith,
  switchMapTo,
  take,
  takeWhile,
  tap,
  toArray
} from 'rxjs/operators';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { GalleryItem } from '../../../shared/models/galleryItem';
import { GalleryItemType } from '../../../shared/models/galleryItemTypes';
import { CreateSimpiRequest, CreateStepRequest, SimpiChangeRequest } from '../../../../../../simpi-frontend-common/src/lib/models';
import { SimpiService } from '../../../../../../simpi-frontend-common/src/lib/services/simpis/simpi.service';
import { StepService } from '../../../../../../simpi-frontend-common/src/lib/services/steps/step.service';
import { CreationProgressComponent } from '../../components/creation-progress/creation-progress.component';
import { CreatorService } from '../../services/creator.service';
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import { TabNavService } from '../../../tabNav/tabNav.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

const { CameraPreview, Filesystem, Haptics } = Plugins;

@Component({
  selector: 'sim-creator',
  templateUrl: 'creator.page.html',
  styleUrls: ['creator.page.scss']
})

export class CreatorPage implements ViewDidEnter, ViewWillLeave {
  public isToBack: boolean = true;
  public showFocus: boolean = true;
  public simpiFiles: GalleryItem[] = [];
  public showGallery: boolean = false;
  public slideOpts: any = {
    initialSlide: 0,
    slidesPerView: 6
  };
  public galleryItemType: typeof GalleryItemType = GalleryItemType;
  public recording: boolean = false;
  public recordingTime$: Observable<string>;

  public captureMode: 'image' | 'video' = 'image';
  private _cameraActive: boolean = false;
  private _firstImg: File;
  private _screenHeight: number;
  private _cameraPosition: string = 'rear';
  private _cameraPreviewOpts: CameraPreviewOptions = {
    position: this._cameraPosition,
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true
  };

  @ViewChild('ripple')
  public ripple: ElementRef<HTMLDivElement>;

  @ViewChild('content', { read: ElementRef })
  public content: ElementRef<IonContent>;

  @ViewChild('slider')
  public slider: IonSlides;

  @ViewChild('thumbnailContainer')
  public thumbnailContainer: CdkVirtualScrollViewport;

  public video: SafeUrl;

  constructor(
    private modalCtrl: ModalController,
    private creatorService: CreatorService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private imagePicker: ImagePicker,
    private simpiService: SimpiService,
    private stepService: StepService,
    private renderer: Renderer2,
    private tabNavService: TabNavService
  ) {
  }

  public ionViewDidEnter(): void {
    this.resetState();
    this.setupPlatform();
    this.checkOrientation();
    this.tabNavService.setVisibility('hidden');
    this.startCamera();
  }

  public flipCamera(): void {
    CameraPreview.flip();
    this._cameraPosition = this._cameraPosition === 'rear' ? 'front' : 'rear';
  }

  public onTapHandler(e: any): void {
    this.focusCamera(e);
  }

  public captureImage(): void {
    this.takePicture();
  }

  public stopRecordVideo(): void {
    if (this._cameraActive && this.recording) {
      from(CameraPreview.stopRecordVideo()).subscribe(({ value }) => {
        if (value) {
          let ext = value.substr(value.lastIndexOf('/') + 1);
          ext = ext.split('?')[0];
          ext = ext.split('#')[0];

          this.addToSimpiFiles(ext, value, GalleryItemType.VIDEO, 'last');
          Haptics.impact({ style: HapticsImpactStyle.Heavy });
        }
        this.recording = false;
        this.cdr.detectChanges();
      });
    }
  }

  public startRecordVideo(): void {
    if (!this.recording) {
      from(CameraPreview.startRecordVideo()).subscribe(() => {
        this.recording = true;

        this.recordingTime$ = interval(1000).pipe(
          startWith(0),
          scan((acc, curr) => curr + 1),
          map(duration => `${duration}s`),
          finalize(() => {
            this.stopRecordVideo();
          }),
          take(6)
        );
      });
    }
  }

  public onCreateSimpi(): void {
    if (this.simpiFiles.length === 0) {
      return;
    } else {
      this.addSimpi();
    }
  }

  public openGallery(): void {
    this.showGallery = true;
    this.cdr.detectChanges();
    this.stopCamera();
    from(this.imagePicker.getPictures({ quality: 85 })).pipe(
      takeWhile(() => this.showGallery)
    ).subscribe((images: string[]) => {
      images.forEach(image => {
        const fileName = new Date().getTime() + '.jpeg';
        const fileExt = image.split('.');
        this.addToSimpiFiles(fileName, image, fileExt[3] === 'mp4' ?
          GalleryItemType.VIDEO : GalleryItemType.IMAGE
        );
      });
      this.closeGallery();
    });
  }

  public closeGallery(): void {
    this.showGallery = false;
    this.startCamera();
    this.cdr.detectChanges();
  }

  public focusCamera(e: any): void {
    // currently not supported by plugin
    const { currentX, currentY } = e;
    if (currentY < this._screenHeight) {
      this.showFocus = true;
      this.ripple.nativeElement.style.top = `${currentY}px`;
      this.ripple.nativeElement.style.left = `${currentX}px`;
      this.ripple.nativeElement.classList.add('animate');
      setTimeout(() => {
        this.ripple.nativeElement.classList.remove('animate');
      }, 999);
    }
  }

  public drop(e: CdkDragDrop<{ index: number }>): void {
    if (e.isPointerOverContainer) {
      moveItemInArray(this.simpiFiles, e.previousIndex, e.currentIndex);
    } else {
      const { index } = e.item.data;
      this.simpiFiles = this.simpiFiles.filter((file, i) => i !== index);
    }
  }

  public exitCreator(): void {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  public showProgressModal(): Observable<HTMLIonModalElement> {
    return from(this.modalCtrl.create({
      component: CreationProgressComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'totalFiles': this.simpiFiles.length
      }
    })).pipe(
      tap(modalRef => {
        modalRef.present();
      })
    );
  }

  public ionViewWillLeave(): void {
    this.stopCamera();
    this.simpiFiles = [];
    this.tabNavService.setVisibility('visible');
    this.showGallery = false;
    this.cdr.detectChanges();
  }

  private setupPlatform(): void {
    this._screenHeight = this.platform.height();
    this._cameraPreviewOpts.width = this.platform.width();
    this._cameraPreviewOpts.height = this.platform.height();
  }

  private addSimpi(): void {
    // load selected images from device, convert them to File[]
    const readFiles$ = this.simpiFiles.map(x => {
      return from(Filesystem.readFile({ path: x.src })).pipe(
        concatMap(fileResult => {
          const blob = this.creatorService.getBlob(fileResult.data);
          const file = new File([blob], x.fileName, { type: x.type === 'image' ? 'image/jpeg' : 'video/mp4' });
          return of(file);
        }),
      );
    });
    const files$ = concat(...readFiles$).pipe(toArray());
    // compress images
    const convertedFiles$ = files$.pipe(
      concatMap(files => {
        const canvas: HTMLCanvasElement = this.renderer.createElement('canvas');
        return files.map((x, i) => {
          if (x.type === 'image/jpeg') {
            return this.creatorService.compressImage(x, x.name, canvas);
          }
          return of(x);
        });
      })
    );
    // upload images
    const fileUpload$ = convertedFiles$.pipe(
      combineAll(),
      concatMap(files => {
        const reqs = files.map((file, i) => {
          if (i === 0) {
            this._firstImg = file;
          }
          return this.stepService.uploadStepImage(file);
        });
        return concat(...reqs).pipe(
          tap(() => {
            this.creatorService.increaseFileCount();
          }),
          toArray()
        );
      }),
      catchError(() => {
        return EMPTY;
      })
    );
    const simpiToCreate: CreateSimpiRequest = this.creatorService.getEmptyCreateSimpiRequest();
    // create SIMPI
    const createSimpiRequest$ = this.simpiService.addSimpi(simpiToCreate).pipe(
      map(resp => {
        return { id: resp.id, simpi: simpiToCreate };
      }),
      catchError(() => {
        setTimeout(() => {
          this.modalCtrl.dismiss();
        }, 200);
        return EMPTY;
      })
    );
    // chain operations
    const combined$ = this.showProgressModal().pipe(
      switchMapTo(
        createSimpiRequest$.pipe(
          concatMap((result: { id: string, simpi: CreateSimpiRequest }) => {
            return fileUpload$.pipe(
              concatMap(resp => {
                const thumbnailIds = resp.map(x => x.body.imageId as string);
                const createStepRequests = thumbnailIds.map((id, i) => {

                  const step: CreateStepRequest = this.creatorService.getEmptyCreateStepRequest(result.id, this.simpiFiles[i].type, id, i);
                  return this.stepService.addStep(step);
                });
                return concat(...createStepRequests).pipe(
                  toArray(),
                  // return simpiId instead of stepIds
                  mapTo(result),
                  tap(() => {
                    if (result.id) {
                      this.router.navigate(['step-editor', { simpiId: result.id }], { relativeTo: this.route });
                    }
                  }),
                  finalize(() => {
                    this.modalCtrl.dismiss();
                    this.creatorService.resetFileCount();
                  })
                );
              })
            );
          })
        )
      )
    );
    // no need to unsubscribe as observable stream completes
    combined$.pipe(
      mergeMap(result => {
        return this.simpiService.uploadThumbnail(this._firstImg).pipe(
          concatMap(uploadedId => {
            const thumbnailId = uploadedId;
            const { id, simpi } = result;
            const simpiToUpdate: SimpiChangeRequest = {
              deploymentInfo: simpi.deploymentInfo,
              description: simpi.description,
              iconColor: simpi.iconColor,
              showInfoOverlay: simpi.showInfoOverlay,
              thumbnailId,
              title: simpi.title,
              groupName: simpi.groupName,
            };
            return this.simpiService.saveSimpi(id, simpiToUpdate);
          })
        );
      })
    ).subscribe();
  }

  private startCamera(): void {
    if (!this._cameraActive) {
      CameraPreview.start(this._cameraPreviewOpts);
      this._cameraActive = true;
    }
  }

  private stopCamera(): void {
    if (this._cameraActive) {
      CameraPreview.stop();
      this._cameraActive = false;
    }
  }

  private checkOrientation(): void {
    ScreenOrientation.onChange().subscribe((e: any) => {
      if (e && e.type === 'orientationchange') {
        setTimeout(() => {
          this.stopCamera();
        });
        setTimeout(() => {
          const opt = this._cameraPreviewOpts;
          opt.width = this.platform.width();
          opt.height = this.platform.height();
          opt.position = this._cameraPosition;
          CameraPreview.start(opt);
          this._cameraActive = true;
        }, 250);
      }
    });
  }

  private takePicture(): void {
    let takingImage: boolean = true;
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 85
    };
    const base64Data$ = from(CameraPreview.capture(cameraPreviewPictureOptions)).pipe(
      map((result: any) => result.value)
    );
    const photo$ = base64Data$.pipe(
      mergeMap(base64 => {
        return this.creatorService.saveImage(base64);
      })
    );
    photo$.pipe(
      takeWhile(() => takingImage)
    ).subscribe(({ filepath, webviewPath }) => {
      this.addToSimpiFiles(filepath, webviewPath, undefined, 'last');
      takingImage = false;
    });
  }

  private addToSimpiFiles(
    fileName: string,
    src: string,
    type: GalleryItemType = GalleryItemType.IMAGE,
    position: 'first' | 'last' = 'last'
  ): void {
    if (position === 'last') {
      this.simpiFiles.push({
        fileName,
        src,
        type
      });
    } else {
      this.simpiFiles.unshift({
        fileName,
        src,
        type
      });

    }

    let files: any[] = [];
    this.simpiFiles.forEach((x) => {
      from(Filesystem.readFile({ path: x.src })).pipe(
        tap(fileResult => {
          const blob = this.creatorService.getBlob(fileResult.data);
          const file = new File([blob], x.fileName, { type: x.type === 'image' ? 'image/jpeg' : 'video/mp4' });
          files.push(file);
          this.scrollToEndOfThumbnailList();
        })
      ).subscribe();
    });
  }

  private scrollToEndOfThumbnailList(): void {
    this.thumbnailContainer.scrollToIndex(this.simpiFiles.length - 1);
  }

  private resetState(): void {
    this.isToBack = true;
    this.showFocus = true;
    this.simpiFiles = [];
    this.showGallery = false;
  }
}
