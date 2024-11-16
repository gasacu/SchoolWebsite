import { Component, ElementRef, ViewChild } from '@angular/core';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'gallery-image-table',
  templateUrl: './gallery-image-table.component.html',
  styleUrl: './gallery-image-table.component.css',
})
export class GalleryImageTableComponent {
  galleryImages: GalleryImage[] = [];
  gallery: Gallery[] = [];
  galleryId!: number;
  selectedGalleryImageId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private galleryImageService: GalleryImageService,
    private galleryService: GalleryService,
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

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  loadGalleryImages(galleryId: number): void {
    this.galleryService.getGalleryImagesByGalleryId(galleryId).subscribe({
      next: (images) => {
        this.galleryImages = images;
      },
      error: (err) => {
        console.error('Error loading gallery images', err);
      },
    });
  }

  deleteGalleryImage(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.galleryImageService.deleteGalleryImage(id).subscribe({
      next: () => {
        this.galleryImages = this.galleryImages.filter((gi) => gi.id != id);

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting gallery image', err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/galleries']);
  }
}
