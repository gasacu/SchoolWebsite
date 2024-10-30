import { GalleryImage } from "./galleryImage";

export interface Gallery {
    id: number;
    title: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
    galleryImages?: GalleryImage[]; // Optional or empty array
}

