import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StepService } from 'projects/simpi-frontend-common/src/lib/services/steps/step.service';
import { StepMediaUploadService } from 'projects/simpi-frontend-common/src/lib/services/steps/step-media-upload.service';
import { CreateStepRequest } from 'projects/simpi-frontend-common/src/lib/models/http/requests/createStepRequest';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface BatchUploadResult {
  success: boolean;
  totalFiles: number;
  successfulUploads: number;
  createdStepIds: string[];
}

export interface FileUploadProgress {
  file: File;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  stepId?: string;
  error?: string;
}

@Component({
  selector: 'sim-batch-step-upload-modal',
  templateUrl: './batch-step-upload-modal.component.html',
  styleUrls: ['./batch-step-upload-modal.component.scss']
})
export class BatchStepUploadModalComponent implements OnInit, OnDestroy {

  @Input() simpiId: string;
  @Input() insertAfterStepId?: string;
  @Input() preSelectedFiles?: File[];

  public files: File[] = [];
  public uploadProgress: FileUploadProgress[] = [];
  public isUploading: boolean = false;
  public isCompleted: boolean = false;
  public showFileSelector: boolean = true;

  private _componentActive: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private stepService: StepService,
    private stepMediaUploadService: StepMediaUploadService
  ) {}

  public ngOnInit(): void {
    // If files were pre-selected (from drag & drop), set them up immediately
    if (this.preSelectedFiles && this.preSelectedFiles.length > 0) {
      this.onFilesToUploadReceived(this.preSelectedFiles);
    }
  }

  public ngOnDestroy(): void {
    this._componentActive = false;
  }

  public onFilesToUploadReceived(files: File[]): void {
    if (files && files.length > 0) {
      this.files = files;
      this.uploadProgress = files.map(file => ({
        file,
        status: 'pending',
        progress: 0
      }));
      this.showFileSelector = false;
    }
  }

  public async startBatchUpload(): Promise<void> {
    if (this.files.length === 0) return;

    this.isUploading = true;
    const createdStepIds: string[] = [];
    let successfulUploads = 0;

    try {
      // Process files sequentially to maintain order
      for (let i = 0; i < this.files.length; i++) {
        const fileProgress = this.uploadProgress[i];
        
        try {
          fileProgress.status = 'uploading';
          fileProgress.progress = 10;

          // Create empty step first
          const insertAfterStepId = i === 0 ? this.insertAfterStepId : createdStepIds[i - 1];
          
          const stepId = await this.createEmptyStep('', insertAfterStepId);
          fileProgress.stepId = stepId;
          fileProgress.progress = 30;

          // Upload media
          fileProgress.status = 'processing';
          const uploadResult = await this.uploadStepMedia(fileProgress.file);
          fileProgress.progress = 80;

          // Apply media to step
          await this.applyMediaToStep(stepId, uploadResult);
          
          fileProgress.status = 'completed';
          fileProgress.progress = 100;
          createdStepIds.push(stepId);
          successfulUploads++;

        } catch (error) {
          fileProgress.status = 'error';
          fileProgress.error = error.message || 'Upload failed';
          console.error(`Failed to process file ${fileProgress.file.name}:`, error);
        }
      }

      this.isCompleted = true;
      
      // Return result to parent
      const result: BatchUploadResult = {
        success: successfulUploads > 0,
        totalFiles: this.files.length,
        successfulUploads,
        createdStepIds
      };

      this.activeModal.close(result);

    } catch (error) {
      console.error('Batch upload failed:', error);
      this.isUploading = false;
    }
  }

  private async createEmptyStep(title: string, insertAfterStepId?: string): Promise<string> {
    const createStepRequest: CreateStepRequest = {
      title,
      description: '',
      simpiId: this.simpiId,
      thumbnailId: null,
      mediaType: null,
      portraitIndicator: {
        x1: 0.5,
        y1: 0.5,
        x2: 0.5,
        y2: 0.5
      },
      stickers: [],
      textBackgroundColor: '#000000',
      textPositionY: 0,
      voiceOverEnabled: true,
      videoId: null,
      insertStepAfterStepId: insertAfterStepId,
    };

    return this.stepService.addStep(createStepRequest).toPromise();
  }

  private async uploadStepMedia(file: File): Promise<any> {
    return this.stepMediaUploadService.uploadStepMedia(file);
  }

  private async applyMediaToStep(stepId: string, uploadResult: any): Promise<void> {
    const mediaChangeRequest = {
      thumbnailId: uploadResult.thumbnailId,
      videoId: uploadResult.videoId || null,
      mediaType: uploadResult.videoId ? 'video' : 'image'
    };

    await this.stepService.saveNewStepMedia(stepId, mediaChangeRequest).toPromise();
  }


  public cancelUpload(): void {
    if (this.isUploading) {
      // TODO: Cancel ongoing uploads
    }
    this.activeModal.dismiss('cancelled');
  }

  public closeModal(): void {
    const result: BatchUploadResult = {
      success: this.uploadProgress.some(p => p.status === 'completed'),
      totalFiles: this.files.length,
      successfulUploads: this.uploadProgress.filter(p => p.status === 'completed').length,
      createdStepIds: this.uploadProgress.filter(p => p.stepId).map(p => p.stepId)
    };
    this.activeModal.close(result);
  }

  public getOverallProgress(): number {
    if (this.uploadProgress.length === 0) return 0;
    
    const totalProgress = this.uploadProgress.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / this.uploadProgress.length);
  }

  public getStatusCounts() {
    const counts = {
      pending: 0,
      uploading: 0,
      processing: 0,
      completed: 0,
      error: 0
    };

    this.uploadProgress.forEach(item => {
      counts[item.status]++;
    });

    return counts;
  }

  public trackByFile(index: number, item: FileUploadProgress): string {
    return `${item.file.name}-${item.file.size}-${index}`;
  }

  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  public getStatusText(status: string): string {
    switch (status) {
      case 'pending': return '';
      case 'uploading': return 'Uploading...';
      case 'processing': return 'Processing...';
      case 'completed': return 'Completed';
      case 'error': return 'Failed';
      default: return 'Unknown';
    }
  }

  public getStatusDisplayName(status: string): string {
    switch (status) {
      case 'pending': return 'Pending';
      case 'uploading': return 'Uploading';
      case 'processing': return 'Processing';
      case 'completed': return 'Completed';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  }
}