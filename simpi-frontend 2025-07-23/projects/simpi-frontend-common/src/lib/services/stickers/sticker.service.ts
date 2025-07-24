import { Injectable } from '@angular/core';
import { CUSTOM_STICKER_ID, MISSING_RESOURCE_STICKER_ID, RESOURCE_STICKER_ID, SimpiStickerCollection } from './simpi-sticker-collection';
import { Sticker } from '../../models/sticker';
import { StickerPalette } from '../../models/sticker-palette';
import { Subject, Observable } from 'rxjs';
import { ResourceService } from '../resources/resource.service';
import { StickerInfo } from 'projects/simpi-frontend-common/src/step-editor/models/stickerInfo';
import { StickerDropped } from '../../models/sticker-dropped';

@Injectable({
  providedIn: 'root'
})
export class StickerService {

  private stickerCollection = new SimpiStickerCollection();
  private stickerImages: Map<number, HTMLImageElement> = new Map();
  private resourceImages: Map<string, HTMLImageElement> = new Map();
  private addStickerSubject: Subject<Sticker> = new Subject<Sticker>();
  private addSticker$: Observable<Sticker> = this.addStickerSubject.asObservable();
  private stickerDropped: Subject<StickerDropped> = new Subject<StickerDropped>();
  public stickerDropped$: Observable<StickerDropped> = this.stickerDropped.asObservable();

    constructor(private resourcesService: ResourceService) {
    this.checkValidityOfConfiguration();
    this.preloadStickers();
  }

  public getStickerById(stickerId: number): Sticker {
    return this.stickerCollection.stickers.find(sticker => sticker.id === stickerId);
  }

  public getStickerImage(sticker: StickerInfo): HTMLImageElement | HTMLVideoElement {
    if (sticker.type === RESOURCE_STICKER_ID || sticker.type === CUSTOM_STICKER_ID) {
      const resourceId: string = sticker.actionId;
      let imageRetrievalFunction: () => string;
      if (sticker.previewImageId) {
        imageRetrievalFunction = () => this.resourcesService.getResourceImageUrl(sticker.previewImageId);
      } else {
        imageRetrievalFunction = () => this.getStickerById(MISSING_RESOURCE_STICKER_ID)?.filepath;
      }
      return this.getAndCacheImage(this.resourceImages, resourceId, sticker.isVideo, imageRetrievalFunction);
    } else {
      return this.getAndCacheImage(this.stickerImages, sticker.type, sticker.isVideo, () => this.getStickerById(sticker.type)?.filepath);
    }
  }

  public droppedSticker(ev: StickerDropped): void {
      this.stickerDropped.next(ev);
  }

  public getStickerImageById(stickerId: number, isVideo: boolean): HTMLImageElement | HTMLVideoElement {
    return this.getAndCacheImage(this.stickerImages, stickerId, isVideo, () => this.getStickerById(stickerId)?.filepath);
  }

  public get palettes(): StickerPalette[] {
    return this.stickerCollection.palettes;
  }

  public addStickerToStep(sticker: Sticker) {
    this.addStickerSubject.next(sticker);
  }

  public getAddStickerObservable(): Observable<Sticker> {
    return this.addSticker$;
  }

  private getAndCacheImage(map: Map<string | number, HTMLImageElement | HTMLVideoElement>,
                           key: string | number, isVideo: boolean,
                           imagePathRetrievalFn: () => string): HTMLImageElement | HTMLVideoElement {
    if (map.has(key)) {
      return map.get(key);
    } else {
      const src = imagePathRetrievalFn();
      if (isVideo) {
        const video: HTMLVideoElement = document.createElement('video');
        video.loop = true;
        video.autoplay = true;
        video.muted = true;
        video.src = src;
        video.style.visibility = "hidden";
        video.style.position = "absolute";
        video.style.top = "0";
        document.body.appendChild(video);
        video.load();
        map.set(key, video);
        return video;
      } else {
        const image: HTMLImageElement = new Image();
        image.onload = () => {
          map.set(key, image);
        };
        image.src = src ?? '';
        return image;
      }
    }
  }

  private checkValidityOfConfiguration(): void {
    const availableStickerIds: number[] = this.stickerCollection.stickers.map(sticker => sticker.id);
    if (!(this.stickerCollection.palettes.map(palette => palette.stickerIds)
      .every((paletteStickerIds => paletteStickerIds.every(paletteStickerId => availableStickerIds.includes(paletteStickerId)))))) {
      throw new Error('Invalid id in StickerPalette');
    }
  }

  private preloadStickers() {
    this.stickerCollection.stickers.forEach(sticker => {
      if (sticker.preloadStickerInPlayer) {
        this.getAndCacheImage(this.stickerImages, sticker.id, sticker.isVideo, () => this.getStickerById(sticker.id)?.filepath);
      }
    });
  }
}
