import { LanguageResponse } from './languageResponse';

export interface TranslationTargetResponse {
    language: LanguageResponse;
    outdated: boolean;
    outdatedMetadata: boolean;
    userProvided: boolean;
    userProvidedMetadata: boolean;
    isChanging?: boolean;
}
