import { ThemeResponse } from './themeResponse';

export interface CustomerResponse {
    id: string;

    name: string;

    contactPersonId: string;

    urlLiteral: string;

    creationDate: string;

    theme: ThemeResponse;
}