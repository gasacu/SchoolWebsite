import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { GalleryImage } from '../../../../entities/galleryImage';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrl: './gallery-form.component.css',
})
export class GalleryFormComponent implements OnInit {
  galleryImages: GalleryImage[] = [];

  gallery: Gallery = {
    id: 0,
    title: '',
    description: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    galleryImages: [],
  };

  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private galleryService: GalleryService,
    private galleryImageService: GalleryImageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('id is ', id);
      if (id) {
        this.isEditing = true;
        this.loadGallery(+id);
      }
    });
  }

  loadGallery(id: number): void {
    this.galleryService.getGalleryById(id).subscribe({
      next: (gallery) => {
        this.gallery = gallery;
        // If galleryImages are not included, fetch them separately
        if (
          !this.gallery.galleryImages ||
          this.gallery.galleryImages.length === 0
        ) {
          this.loadGalleryImages(id);
        }
      },
      error: (err) => {
        this.errorMessage = 'Error loading gallery';
      },
    });
  }

  loadGalleryImages(galleryId: number): void {
    this.galleryImageService.getGalleryImagesByGalleryId(galleryId).subscribe({
      next: (images) => {
        this.gallery.galleryImages = images;
      },
      error: (err) => {
        console.error('Error loading gallery images:', err);
      },
    });
  }

  deleteGalleryImage(imageId: number): void {
    this.galleryImageService.deleteGalleryImage(imageId).subscribe({
      next: () => {
        this.gallery.galleryImages =
          this.gallery.galleryImages?.filter((img) => img.id !== imageId) || [];
      },
      error: (err) => {
        console.error('Error deleting gallery image:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.galleryService.editGallery(this.gallery).subscribe({
        next: () => {
          this.router.navigate(['/galleries']);
        },
        error: (err) => {
          console.error('Error updating gallery:', err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        },
      });
    } else {
      // creating
      this.galleryService.createGallery(this.gallery).subscribe({
        next: () => {
          this.router.navigate(['/galleries']);
        },
        error: (err) => {
          console.error('Error creating gallery:', err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/galleries']);
  }
}
