import { Injectable } from '@angular/core';
import { Vector2 } from '../../../step-editor/models/vector2';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public cropAndScaleImage(imageUrl: string, targetSize: Vector2): Promise<File> {
    return new Promise<File>(resolve => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const renderingContext2D: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false });
      canvas.width = targetSize.x;
      canvas.height = targetSize.y;
      const image: HTMLImageElement = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
      this.drawImageToCanvas(image, targetSize, renderingContext2D);
        canvas.toBlob(blob => {
          const file: File = new File([blob], 'image.webp', { type: 'image/webp' });
          canvas.remove();
          resolve(file);
        }, 'image/webp');
      };
      image.src = imageUrl;
    });
  }

  public cropAndScaleImageFromFile(imageFile: File, targetSize: Vector2): Promise<File> {
    return new Promise<File>(resolve => {
      const imageUrl: string = URL.createObjectURL(imageFile);
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const renderingContext2D: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false });
      canvas.width = targetSize.x;
      canvas.height = targetSize.y;
      const image: HTMLImageElement = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        this.drawImageToCanvas(image, targetSize, renderingContext2D);
        canvas.toBlob(blob => {
          const file: File = new File([blob], 'image.webp', { type: 'image/webp' });
          canvas.remove();
          URL.revokeObjectURL(imageUrl);
          resolve(file);
        }, 'image/webp');
      };
      image.src = imageUrl;
    });
  }

  public getThumbnailFromVideo(videoFile: File, targetSize: Vector2): Promise<File> {
    return new Promise<File>(resolve => {
      const videoUrl: string = URL.createObjectURL(videoFile);
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      const renderingContext2D: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false });
      canvas.width = targetSize.x;
      canvas.height = targetSize.y;
      const video: HTMLVideoElement = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.onloadeddata = () => {
        const videoDimensions: Vector2 = new Vector2(video.videoWidth, video.videoHeight);
        const scaleFactor: number = Math.min(videoDimensions.x / targetSize.x, videoDimensions.y / targetSize.y);
        const copyDimensions: Vector2 = targetSize.scale(scaleFactor).roundToInt();
        const offset: Vector2 = videoDimensions.add(copyDimensions.inv()).scale(0.5).roundToInt();
        renderingContext2D.drawImage(video, offset.x, offset.y, copyDimensions.x, copyDimensions.y, 0, 0, targetSize.x, targetSize.y);
        canvas.toBlob(blob => {
          const file: File = new File([blob], 'image.webp', { type: 'image/webp' });
          canvas.remove();
          video.remove();
          URL.revokeObjectURL(videoUrl);
          resolve(file);
        }, 'image/webp');
      };
      video.src = videoUrl;
      video.currentTime = 1;
    });
  }

  private drawImageToCanvas(image: HTMLImageElement, targetSize: Vector2, renderingContext2D: CanvasRenderingContext2D): void {
    const imageDimensions: Vector2 = new Vector2(image.naturalWidth, image.naturalHeight);
    const scaleFactor: number = Math.min(imageDimensions.x / targetSize.x, imageDimensions.y / targetSize.y);
    const copyDimensions: Vector2 = targetSize.scale(scaleFactor).roundToInt();
    const offset: Vector2 = imageDimensions.add(copyDimensions.inv()).scale(0.5).roundToInt();
    renderingContext2D.drawImage(image, offset.x, offset.y, copyDimensions.x, copyDimensions.y, 0, 0, targetSize.x, targetSize.y);
  }

}
