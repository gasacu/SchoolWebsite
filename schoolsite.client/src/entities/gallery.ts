import { GalleryImage } from './galleryImage';

export interface Gallery {
  id: number;
  year: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  galleryImages?: GalleryImage[]; // Optional or empty array
}
