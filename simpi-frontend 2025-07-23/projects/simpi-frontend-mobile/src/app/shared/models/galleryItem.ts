import { GalleryItemType } from './galleryItemTypes';

export interface GalleryItem {
    type: GalleryItemType;
    fileName: string;
    src: string;
}

