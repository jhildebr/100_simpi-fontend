export interface TableData<T> {
    prop: string;
    text: string;
    imageOrIcon?(element: T): any;
    cell(element: T): any;
    type?: string;
    extraCss?: string;
    singular?: string;
    plural?: string;
}