export interface CsvImportError {
    invalidRecord: string;
    invalidField: string;
    invalidRowIndex: number;
    invalidCharIndex: number;
}