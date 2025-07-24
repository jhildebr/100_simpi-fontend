import { LanguageResponse } from "./languageResponse";

export interface TranslationResponse {
    associatedStepId: string;
    translatedTitle: string;
    translatedDescription: string;
    isChanging: boolean;
    language: LanguageResponse;
}
