import { InjectionToken } from '@angular/core';

export const COMMON_CONFIG = new InjectionToken<SimpiCommonConfig>('SimpiCommonsConfig');

export interface SimpiCommonConfig {
    baseUrl?: string;
    restUrl?: string;
    userServiceUrl?: string;
    authStorageKey?: string;
}
