import { Component } from '@angular/core';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'gallery-image-table',
  templateUrl: './gallery-image-table.component.html',
  styleUrl: './gallery-image-table.component.css',
})
export class GalleryImageTableComponent {
  galleryImages: GalleryImage[] = [];
  galleryId!: number;

  constructor(
    private galleryImageService: GalleryImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.galleryId = +id;
        this.loadGalleryImages(this.galleryId);
      }
    });
  }

  loadGalleryImages(galleryId: number): void {
    this.galleryImageService.getGalleryImagesByGalleryId(galleryId).subscribe({
      next: (data: GalleryImage[]) => {
        this.galleryImages = data;
      },
      error: (err) => {
        console.error('Error loading gallery images', err);
      },
    });
  }

  deleteGalleryImage(id: number): void {
    this.galleryImageService.deleteGalleryImage(id).subscribe({
      next: () => {
        this.galleryImages = this.galleryImages.filter((gi) => gi.id != id);
      },
      error: (err) => {
        console.error('Error for deleting gallery image', err);
      },
    });
  }

  editGalleryImage(id: number): void {
    this.router.navigate(['/gallery-images/edit', id]);
  }
}
