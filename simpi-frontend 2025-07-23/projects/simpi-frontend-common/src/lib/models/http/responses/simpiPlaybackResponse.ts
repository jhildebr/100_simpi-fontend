import { ResourceResponse } from "./resourceResponse";
import { StepPlaybackResponse } from "./stepPlaybackResponse";
import { TranslationResponse } from "./translationResponse";

export interface SimpiPlaybackResponse {
    simpiId: string;
    productId: string;
    title: string;
    description: string;
    bestTranslationTarget: string;
    showInfoOverlay: boolean;
    steps: StepPlaybackResponse[];
    resources: ResourceResponse[];
    translations: TranslationResponse[];
    primaryColor: string;
}
