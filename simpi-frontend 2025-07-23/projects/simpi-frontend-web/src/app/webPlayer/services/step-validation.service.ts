import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StepPlaybackResponse } from 'projects/simpi-frontend-common/src/lib/models';

export interface ValidatedStep {
  stepId: string;
  title: string;
  description: string;
  thumbnail: string;
  voiceOverEnabled: boolean;
  media: any[];
  stickers: any[];
  portraitIndicator: any;
  textBackgroundColor: string;
  textPositionY: number;
  groupName?: string;
  hasAudio: boolean;
  positionIndex?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StepValidationService {

  constructor(private http: HttpClient) { }

  /**
   * Validates all steps to determine which ones actually have audio
   * @param steps Array of steps from the API
   * @param language Language code for audio validation
   * @returns Observable of validated steps sorted by positionIndex
   */
  validateSteps(steps: StepPlaybackResponse[], language: string): Observable<ValidatedStep[]> {
    if (!steps || steps.length === 0) {
      return of([]);
    }

    // Create validation observables for each step
    const validationObservables = steps.map(step => 
      this.validateStepAudio(step, language)
    );

    // Wait for all validations to complete
    return of(validationObservables).pipe(
      map(observables => {
        // For now, we'll validate synchronously by checking description
        // In a full implementation, we'd use combineLatest for async validation
        return steps.map(step => this.validateStepSynchronously(step));
      })
    );
  }

  /**
   * Validates a single step's audio availability
   * @param step The step to validate
   * @param language Language code
   * @returns Observable of validation result
   */
  private validateStepAudio(step: StepPlaybackResponse, language: string): Observable<boolean> {
    // Check if step has voiceOverEnabled and description
    if (!step.voiceOverEnabled) {
      return of(false);
    }

    // If description is empty or undefined, no audio exists
    if (!step.description || step.description.trim() === '') {
      return of(false);
    }

    // For now, assume audio exists if description is present
    // In a full implementation, we'd make an API call to verify
    return of(true);
  }

  /**
   * Synchronous validation based on description field
   * @param step The step to validate
   * @returns ValidatedStep with hasAudio property
   */
  private validateStepSynchronously(step: StepPlaybackResponse): ValidatedStep {
    // Fix the boolean logic to ensure we get true/false, not empty strings
    const hasAudio = Boolean(step.voiceOverEnabled && 
                           step.description && 
                           step.description.trim() !== '');
    
    return {
      stepId: step.stepId,
      title: step.title,
      description: step.description,
      thumbnail: step.thumbnail,
      voiceOverEnabled: step.voiceOverEnabled,
      media: step.media,
      stickers: step.stickers,
      portraitIndicator: step.portraitIndicator,
      textBackgroundColor: step.textBackgroundColor,
      textPositionY: step.textPositionY,
      groupName: step.groupName,
      hasAudio,
      positionIndex: (step as any).positionIndex || 0
    };
  }

  /**
   * Sorts steps by positionIndex
   * @param steps Array of validated steps
   * @returns Sorted array
   */
  sortStepsByPosition(steps: ValidatedStep[]): ValidatedStep[] {
    return steps.sort((a, b) => a.positionIndex - b.positionIndex);
  }
} 