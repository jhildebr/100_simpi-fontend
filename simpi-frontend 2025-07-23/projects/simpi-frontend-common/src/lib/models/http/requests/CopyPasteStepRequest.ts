export interface CopyPasteStepRequest {
  stepId?: string;

  simpiId: string;

  insertStepAfterStepId: string | undefined;
}
