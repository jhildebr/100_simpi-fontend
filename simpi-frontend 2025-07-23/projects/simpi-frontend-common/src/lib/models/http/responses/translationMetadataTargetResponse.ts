import { LanguageResponse } from './languageResponse';

export interface TranslationMetadataTargetResponse {
    language: LanguageResponse;
    outdated: boolean;
    userProvided: boolean;
    isChanging?: boolean;
}
