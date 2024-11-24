import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GalleryImage } from '../../entities/galleryImage';

@Injectable({
  providedIn: 'root',
})
export class GalleryImageService {
  private apiUrl = `${environment.apiUrl}/galleryImage`;

  constructor(private http: HttpClient) {}

  getGalleryImageById(id: number): Observable<GalleryImage> {
    return this.http.get<GalleryImage>(`${this.apiUrl}/${id}`);
  }

  getImagesByGalleryId(galleryId: number): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.apiUrl}/${galleryId}/images`);
  }

  createGalleryImage(galleryImage: GalleryImage): Observable<GalleryImage> {
    return this.http.post<GalleryImage>(this.apiUrl, galleryImage);
  }

  deleteGalleryImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editGalleryImage(galleryImage: GalleryImage): Observable<GalleryImage> {
    return this.http.put<GalleryImage>(
      `${this.apiUrl}/${galleryImage.id}`,
      galleryImage
    );
  }

  uploadImage(file: File, galleryId: number): Observable<GalleryImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('galleryId', galleryId.toString());

    return this.http.post<GalleryImage>(`${this.apiUrl}/upload`, formData);
  }
}
