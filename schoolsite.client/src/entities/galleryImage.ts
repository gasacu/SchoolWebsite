import { Gallery } from "./gallery";

export interface GalleryImage {
    id: number;
    imagePath: string;
    createdDate: Date;
    galleryId: number;
    // gallery?: Gallery;
}