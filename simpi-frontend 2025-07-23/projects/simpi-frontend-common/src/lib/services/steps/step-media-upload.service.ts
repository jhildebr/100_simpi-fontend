import { Injectable } from '@angular/core';
import { StepService } from './step.service';
import { Vector2 } from '../../../step-editor/models/vector2';
import { HttpResponse } from '@angular/common/http';
import { StepMediaChangeRequest, StepResponse, UploadStepImageResponse, UploadStepVideoResponse } from '../../models';
import { ImageService } from '../images/image.service';
import { UploadStepMediaResult } from '../../models/step-media/UploadStepMediaResult';
import { StepMedia } from '../../models/step-media/StepMedia';
import { STEP_MEDIA_TYPE_IMAGE, STEP_MEDIA_TYPE_VIDEO } from '../../shared/constants';

@Injectable({ providedIn: 'root' })
export class StepMediaUploadService {

  private latestUploadStepMediaResult: UploadStepMediaResult = null;

  constructor(private stepService: StepService, private imageService: ImageService) {
  }

  /**
   * Uploads the provided file to the server. Does not update any step.
   * @param fileToUpload File that should be uploaded. File type must be video/* or image/*.
   * @returns Promise<UploadStepMediaResult> Promise containing properties of uploaded media. Rejected if unexpected error occurs.
   */
  public async uploadStepMedia(fileToUpload: File): Promise<UploadStepMediaResult> {
    const mediaType: string = this.detectMediaType(fileToUpload);
    if (!mediaType) {
      this.logError('uploadStepMedia', `File type not supported: '${fileToUpload.type}'.`);
      return Promise.reject(new Error(`Invalid MediaType: '${fileToUpload.type}'`));
    }

    const result: UploadStepMediaResult = {
      mediaType: mediaType,
      success: false,
    };

    try {
      if (mediaType === STEP_MEDIA_TYPE_VIDEO) {
        this.logDebug('uploadStepMedia', 'Generating thumbnail image from video...');
        const thumbnail: File = await this.imageService.getThumbnailFromVideo(fileToUpload, new Vector2(240, 384));
        this.logDebug('uploadStepMedia', 'Successfully generated thumbnail image from video.');

        this.logDebug('uploadStepMedia', 'Uploading thumbnail image...');
        const uploadThumbnailResponse: HttpResponse<UploadStepImageResponse> = await this.stepService.uploadStepThumbnail(thumbnail).toPromise();
        if (!this.isUploadResponseOk(uploadThumbnailResponse, 'uploadStepMedia', 'thumbnail image')) {
          this.latestUploadStepMediaResult = result;
          return result;
        }

        result.thumbnailId = uploadThumbnailResponse.body.imageId;
        result.thumbnailUrl = this.stepService.getStepImageUrl(uploadThumbnailResponse.body.imageId);

        this.logDebug('uploadStepMedia', 'Uploading video...');
        const uploadVideoResponse: HttpResponse<UploadStepVideoResponse> = await this.stepService.uploadStepVideo(fileToUpload).toPromise();
        if (!this.isUploadResponseOk(uploadVideoResponse, 'uploadStepMedia', 'video')) {
          this.latestUploadStepMediaResult = result;
          return result;
        }

        result.videoId = uploadVideoResponse.body.videoId;
        result.videoUrl = this.stepService.getStepVideoUrl(uploadVideoResponse.body.videoId);
        result.success = true;

      } else if (mediaType === STEP_MEDIA_TYPE_IMAGE) {
        this.logDebug('uploadStepMedia', 'Uploading image...');
        const uploadStepImageResponse: HttpResponse<UploadStepImageResponse> = await this.stepService.uploadStepImage(fileToUpload).toPromise();

        if (!this.isUploadResponseOk(uploadStepImageResponse, 'uploadStepMedia', 'image')) {
          this.latestUploadStepMediaResult = result;
          return result;
        }

        result.thumbnailId = uploadStepImageResponse.body.imageId;
        result.thumbnailUrl = this.stepService.getStepImageUrl(uploadStepImageResponse.body.imageId);
        result.videoId = null;
        result.videoUrl = null;
        result.success = true;
      }

      this.latestUploadStepMediaResult = result;
      return result;
    } catch (error) {
      this.logError('uploadStepMedia', `Error uploading media: ${error}.`);
      this.latestUploadStepMediaResult = result;
      return Promise.reject(error);
    }
  }

  /**
   * Uploads the provided file and updates the step with the new media type (image or video), thumbnail id and video id (if file is video).
   * Also, the relevant properties of the step object (mediaType, thumbnail id and url, video id and url) are updated in-place.
   * @param step Step object that serves as provider for the stepId and will be updated with the new properties of the uploaded media.
   * @param fileToUpload The file that will be uploaded to the server if it is of a supported type (image or video).
   * @returns Promise<UploadStepMediaResult> Promise containing properties of uploaded media. Rejected if unexpected error occurs.
   */
  public async uploadAndChangeStepMedia(step: StepResponse, fileToUpload: File): Promise<UploadStepMediaResult> {
    try {
      this.logDebug('uploadAndChangeStepMedia', 'Uploading step media...');
      const uploadedStepMediaResult: UploadStepMediaResult = await this.uploadStepMedia(fileToUpload);

      if (uploadedStepMediaResult.success) {
        this.logDebug('uploadAndChangeStepMedia', 'Successfully uploaded step media.');

        this.logDebug('uploadAndChangeStepMedia', 'Saving new step media properties...');
        const success: boolean = await this.saveStepMediaProperties(step, uploadedStepMediaResult);

        if (success) {
          this.logDebug('uploadAndChangeStepMedia', 'Successfully saved new step media properties.');
        } else {
          this.logError('uploadAndChangeStepMedia', `Error saving new step media properties.`);
          uploadedStepMediaResult.success = false;
          this.stepService.setError(true);
        }

      } else {
        this.logError('uploadAndChangeStepMedia', `Error uploading step media.`);
        this.stepService.setError(true);
      }

      return uploadedStepMediaResult;

    } catch (error) {
      this.logError('uploadAndChangeStepMedia', `Error uploading media: ${error}.`);
      return Promise.reject(error);
    }
  }

  /**
   * Updates the media properties (media type, thumbnail id and video id) of the step identified by the step param's id property on the server.
   * Moreover, the relevant properties of the step param object (mediaType, thumbnail id and url, video id and url) are updated in-place.
   * @param step Step object that serves as provider for the stepId and will be updated with the new step media properties.
   * @param newStepMediaId New thumbnail id or video id of the new step media that should be persisted for the given step.
   * @returns Promise Promise is resolved if update succeeded rejected if errors occur.
   */
  public async persistStepMediaPropertiesOfLatestUpload(step: StepResponse, newStepMediaId: string): Promise<void> {
    if (!step) {
      this.logError('persistStepMediaPropertiesOfLatestUpload', 'No step provided.');
      return Promise.reject('No step provided.');
    }

    if (!newStepMediaId) {
      this.logError('persistStepMediaPropertiesOfLatestUpload', 'No newStepMediaId provided.');
      return Promise.reject('No newStepMediaId provided.');
    }

    if (!this.latestUploadStepMediaResult) {
      this.logError('persistStepMediaPropertiesOfLatestUpload', 'No recent step media upload found.');
      return Promise.reject('No recent step media upload found.');
    }

    if (!(newStepMediaId === this.latestUploadStepMediaResult.thumbnailId || newStepMediaId === this.latestUploadStepMediaResult.videoId)) {
      this.logError('persistStepMediaPropertiesOfLatestUpload', 'Latest step media upload has different id than the id ' +
        'provided to the method. Not saving anything to avoid persisting wrong values.');
      return Promise.reject('Latest step media upload has different id than the id provided. Not persisting anything.');
    }

    this.logDebug('persistStepMediaPropertiesOfLatestUpload', 'Found matching step media upload result. ' +
      'Now saving the new thumbnailId (and videoId) of the uploaded media to the step...');

    const succeeded: boolean = await this.saveStepMediaProperties(step, this.latestUploadStepMediaResult);

    if (!succeeded) {
      this.logError('persistStepMediaPropertiesOfLatestUpload',
        `Could not save thumbnailId (and videoId) of uploaded media to step '${step.stepId}'. Uploaded media is orphan now.`);
      return Promise.reject('Could not save thumbnailId (and videoId) of uploaded media to step.');
    }

    this.logDebug('persistStepMediaPropertiesOfLatestUpload', 'Successfully saved the new thumbnailId (and videoId) of the' +
      ' latest uploaded media to the step.');
  }

  /**
   * Deletes the step media files that were most recently uploaded to the server.
   * The primary use case for this method are upload dialogues, where the user can upload new media but then discard changes.
   * @param mediaId ThumbnailId or VideoId of the media that should be deleted. Used to make sure there was no other upload than expected.
   * @returns Promise Promise is resolved and contains true if removal succeeded and false if any error occurred.
   */
  public async removeLastUploadedStepMediaFromServer(mediaId: string): Promise<boolean> {
    if (!this.latestUploadStepMediaResult) {
      this.logDebug('removeLastUploadedStepMediaFromServer', 'No recent step media upload known. Skipping.');
      return;
    }

    if (!(mediaId === this.latestUploadStepMediaResult.thumbnailId || mediaId === this.latestUploadStepMediaResult.videoId)) {
      this.logDebug('removeLastUploadedStepMediaFromServer', 'Latest step media upload has different id than the id ' +
        'provided to the method. Skipping to avoid deleting the wrong media file.');
      return;
    }

    try {
      if (this.latestUploadStepMediaResult.thumbnailId) {
        this.logDebug('removeLastUploadedStepMediaFromServer', 'Removing thumbnail from server...');
        const response = await this.stepService.removeStepImage(this.latestUploadStepMediaResult.thumbnailId).toPromise();
        if (!this.isDeleteResponseOk(response, 'removeLastUploadedStepMediaFromServer', 'thumbnail')) {
          return false;
        }
      }

      if (this.latestUploadStepMediaResult.videoId) {
        this.logDebug('removeLastUploadedStepMediaFromServer', 'Removing video from server...');
        const response = await this.stepService.removeStepVideo(this.latestUploadStepMediaResult.videoId).toPromise();
        if (!this.isDeleteResponseOk(response, 'removeLastUploadedStepMediaFromServer', 'video')) {
          return false;
        }
      }

      return true;

    } catch (error) {
      this.logError('removeLastUploadedStepMediaFromServer', `Error deleting step media: '${error}'.`);
      return false;
    }
  }

  /**
   * Returns the url that belongs to the mediaId provided, if this mediaId is of the media that has most recently been uploaded.
   * The use case for this method are upload dialogs that need to display a preview of the uploaded media.
   * @param mediaId Id of the media for which the url should be retrieved.
   */
  public getMediaUrlOfLastUploadedStepMedia(mediaId: string): string {
    if (!this.latestUploadStepMediaResult) {
      this.logError('getMediaUrlOfLastUploadedStepMedia', 'No recent step media upload known.');
      return '';
    }

    if (!(mediaId === this.latestUploadStepMediaResult.thumbnailId || mediaId === this.latestUploadStepMediaResult.videoId)) {
      this.logError('getMediaUrlOfLastUploadedStepMedia', 'Latest step media upload has different id than the id ' +
        'provided to the method.');
      return;
    }

    if (this.latestUploadStepMediaResult.mediaType === STEP_MEDIA_TYPE_IMAGE && mediaId === this.latestUploadStepMediaResult.thumbnailId) {
      this.logDebug('getMediaUrlOfLastUploadedStepMedia', 'Returning image url.');
      return this.latestUploadStepMediaResult.thumbnailUrl || this.stepService.getStepImageUrl(mediaId);
    }

    if (this.latestUploadStepMediaResult.mediaType === STEP_MEDIA_TYPE_VIDEO && mediaId === this.latestUploadStepMediaResult.videoId) {
      this.logDebug('getMediaUrlOfLastUploadedStepMedia', 'Returning video url.');
      return this.latestUploadStepMediaResult.videoUrl || this.stepService.getStepVideoUrl(mediaId);
    }

    this.logError('getMediaUrlOfLastUploadedStepMedia', 'MediaId provided does not match id of latest uploaded media.');
    return '';
  }

  /**
   * Returns the file type of the provided file. Value returned is taken from the constants STEP_MEDIA_TYPE_VIDEO and STEP_MEDIA_TYPE_IMAGE.
   * @param file File to check.
   * @returns string | null File type as string ('video' or 'image') if it has been detected. Null otherwise.
   */
  private detectMediaType(file: File): string | null {
    if (file.type.startsWith('video/')) {
      this.logDebug('detectMediaType', 'File type detected as video.');
      return STEP_MEDIA_TYPE_VIDEO;
    } else if (file.type.startsWith('image/')) {
      this.logDebug('detectMediaType', 'File type detected as image.');
      return STEP_MEDIA_TYPE_IMAGE;
    }

    this.logError('detectMediaType', `File type could not be detected as image or video: '${file.type}'.`);

    return null;
  }

  private isUploadResponseOk(response: HttpResponse<any>, methodName: string, mediaType: string): boolean {
    if (response.ok) {
      this.logDebug(methodName, `Successfully uploaded ${mediaType}.`);
      return true;
    } else {
      const serverResponse: string = `status code ${response.status} (${response.statusText})`;
      this.logError(methodName, `Error uploading ${mediaType}. Server responded with ${serverResponse}.`);
      return false;
    }
  }

  /**
   * Updates the media properties (media type, thumbnail id and video id) of the step identified by the step param's id property on the server.
   * Moreover, the relevant properties of the step param object (mediaType, thumbnail id and url, video id and url) are updated in-place.
   * @param step Step object that serves as provider for the stepId and will be updated with the new step media properties.
   * @param newStepMedia New step media properties that should be persisted for the given step.
   * @returns Promise<boolean> Promise is resolved and contains true if update succeeded and false otherwise. Rejected if unexpected error occurs.
   */
  private async saveStepMediaProperties(step: StepResponse, newStepMedia: StepMedia): Promise<boolean> {
    try {
      this.logDebug('saveStepMediaProperties', 'Saving new media properties of step...');
      const httpResponse = await this.stepService.saveNewStepMedia(
        step.stepId,
        StepMediaChangeRequest.fromStepMedia(newStepMedia)
      ).toPromise();

      if (this.isSaveResponseOk(httpResponse, 'saveStepMediaProperties', 'new step media properties')) {
        step.mediaType = newStepMedia.mediaType;
        step.thumbnailId = newStepMedia.thumbnailId;
        step.thumbnailUrl = newStepMedia.thumbnailUrl;
        step.videoId = newStepMedia.videoId;
        step.videoUrl = newStepMedia.videoUrl;
        this.stepService.setError(false);
        return true;
      } else {
        this.stepService.setError(true);
        return false;
      }
    } catch (error) {
      this.logError('saveStepMediaProperties', `Error saving new media properties of step: ${error}.`);
      return Promise.reject(error);
    }
  }

  private isSaveResponseOk(response: HttpResponse<any>, methodName: string, assetType: string): boolean {
    if (response.ok) {
      this.logDebug(methodName, `Successfully saved ${assetType}.`);
      return true;
    } else {
      const serverResponse: string = `status code ${response.status} (${response.statusText})`;
      this.logError(methodName, `Error saving ${assetType}. Server responded with ${serverResponse}.`);
      return false;
    }
  }

  private isDeleteResponseOk(response: HttpResponse<any>, methodName: string, assetType: string): boolean {
    if (response.ok) {
      this.logDebug(methodName, `Successfully deleted ${assetType}.`);
      return true;
    } else {
      const serverResponse: string = `status code ${response.status} (${response.statusText})`;
      this.logError(methodName, `Error deleting ${assetType}. Server responded with ${serverResponse}.`);
      return false;
    }
  }

  private logDebug(method: string, message: string): void {
    console.debug('StepMediaUploadService: Method %s(): %s', method, message);
  }

  private logError(method: string, message: string): void {
    console.error('StepMediaUploadService: Method %s(): %s', method, message);
  }
}
