import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Gallery } from '../../entities/gallery';
import { GalleryImage } from '../../entities/galleryImage';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = `${environment.apiUrl}/gallery`;

  constructor(private http: HttpClient) {}

  getGallerys(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }

  getGalleryById(id: number): Observable<Gallery> {
    return this.http.get<Gallery>(`${this.apiUrl}/${id}`);
  }

  getGalleryImagesByGalleryId(galleryId: number): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(`${this.apiUrl}/${galleryId}/images`);
  }

  createGallery(gallery: Gallery): Observable<Gallery> {
    return this.http.post<Gallery>(this.apiUrl, gallery);
  }

  deleteGallery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editGallery(gallery: Gallery): Observable<Gallery> {
    return this.http.put<Gallery>(`${this.apiUrl}/${gallery.id}`, gallery);
  }
}
