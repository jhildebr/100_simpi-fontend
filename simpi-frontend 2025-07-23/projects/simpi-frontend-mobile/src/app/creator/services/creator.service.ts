import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Photo } from '../../shared/models/photo.model';
import { FilesystemDirectory, Plugins } from '@capacitor/core';
import { map } from 'rxjs/operators';
import { CreateSimpiRequest, CreateStepRequest, DeploymentStateRequest } from '../../../../../simpi-frontend-common/src/lib/models';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../simpi-frontend-common/src/lib/services/auth/auth.service';
import { environment } from '../../../environments/environment';

const { Filesystem } = Plugins;

@Injectable({ providedIn: 'root' })
export class CreatorService {
  private _currentFile: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public currentFile$: Observable<number> = this._currentFile.asObservable();
  private creatorId: string;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userInfo$.subscribe(userInfo => this.creatorId = userInfo?.id);
  }

  public increaseFileCount(): void {
    const currentValue = this._currentFile.getValue();
    this._currentFile.next(currentValue + 1);
  }

  public resetFileCount(): void {
    this._currentFile.next(0);
  }

  public saveImage(base64String: string): Observable<Photo> {
    const fileName = new Date().getTime() + '.jpeg';
    return from(Filesystem.writeFile({
      path: fileName,
      data: `${base64String}`,
      directory: FilesystemDirectory.Data
    })).pipe(
      map(({ uri }) => {
        return {
          filepath: fileName,
          webviewPath: uri
        };
      })
    );
  }

  public getBlob(b64Data: string): Blob {
    let contentType = '*.jpg';
    let sliceSize = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  public compressImage(file: File, fileName: string, canvas: HTMLCanvasElement): Observable<File> {
    const compressedFile$: EventEmitter<File> = new EventEmitter<File>();
    const width = 600; // For scaling relative to width
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ev => {
      const img = new Image();
      img.src = (ev.target as any).result;
      (img.onload = () => {
        const scaleFactor = width / img.width;
        const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');
        canvas.width = width;
        canvas.height = img.height * scaleFactor;
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        const base64String = canvas.toDataURL('image/jpeg', .8).split(',')[1];
        const blob = this.getBlob(base64String);
        const file = new File([blob], fileName);
        return compressedFile$.emit(file);
      }),
        (reader.onerror = error => compressedFile$.error(error));
    };
    return compressedFile$.asObservable();
  }

  public getEmptyCreateSimpiRequest(): CreateSimpiRequest {
    return {
      creatorId: this.creatorId,
      deploymentInfo: {
        deletionDate: new Date(),
        deploymentState: DeploymentStateRequest.Private,
        releaseDate: new Date()
      },
      // TODO: Get 'real' product Id
      productId: environment.mobileCreatedSimpisProductId,
      description: '',
      showInfoOverlay: false,
      title: 'Test',
      iconColor: '',
      thumbnailId: ''
    };
  }

  public getEmptyCreateStepRequest(id: string, mediaType: 'image' | 'video', imageId: string, index: number): CreateStepRequest {
    return {
      description: '',
      mediaType,
      portraitIndicator: {
        x1: 0,
        y1: 0
      },
      positionIndex: index,
      simpiId: id,
      stickers: [],
      textBackgroundColor: '',
      textPositionY: 0,
      thumbnailId: imageId,
      title: '',
      voiceOverEnabled: false,
    };
  }
}
