import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'gallery-image-table',
  templateUrl: './gallery-image-table.component.html',
  styleUrl: './gallery-image-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryImageTableComponent implements OnInit, AfterViewInit {
  galleryImages: any[] = [];
  gallery: Gallery[] = [];
  galleryId!: number;
  selectedGalleryImageId: number | null = null;
  modalInstance: any;
  viewImageModalInstance: any;
  imageToView: string | null = null;
  imgPath: string | null = null;
  selectedFiles: File[] = [];
  selectedFileName: string | null = null;
  successMessage: string | null = null;

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('viewImageModal') viewImageModal!: ElementRef;

  constructor(
    private galleryImageService: GalleryImageService,
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
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
    // Initialize the image modal
    if (this.viewImageModal) {
      this.viewImageModalInstance = new bootstrap.Modal(
        this.viewImageModal.nativeElement,
        {
          backdrop: true,
          keyboard: true,
        }
      );
    }

    // Initialize the delete modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(
        this.exampleModal.nativeElement,
        {
          backdrop: 'static',
          keyboard: true,
        }
      );
    }
  }

  loadGalleryImages(galleryId: number): void {
    this.galleryImageService.getImagesByGalleryId(galleryId).subscribe({
      next: (images) => {
        console.log('Loaded images:', images);
        this.galleryImages = Array.isArray(images) ? images : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading gallery images', err);
      },
    });
  }

  onMultipleImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  uploadMultipleImages(): void {
    const formData = new FormData();

    this.selectedFiles.forEach((file) => formData.append('files', file));
    formData.append('galleryId', this.galleryId.toString());

    this.galleryImageService.uploadMultipleImages(formData).subscribe({
      next: (response) => {
        console.log('Response:', response);
        const images = Array.isArray(response) ? response : [];

        this.galleryImages.push(...images);
        this.selectedFiles = [];
        this.successMessage = 'Images uploaded successfully!';
        setTimeout(() => (this.successMessage = null), 3000);
        this.loadGalleryImages(this.galleryId);
      },
      error: (err) => console.error('Error uploading image', err),
    });
  }

  getImageUrl(imagePath: string | null): string {
    if (imagePath && imagePath.trim()) {
      return `https://localhost:7047/${imagePath}?timestamp=${new Date().getTime()}`;
    }
    return 'https://localhost:7047/Uploads/images/team-members/user.png';
  }

  viewImage(imageUrl: string, event: Event): void {
    event.stopPropagation();
    // Set the image source in the modal
    const modalImage = document.getElementById(
      'modalImage'
    ) as HTMLImageElement;
    if (modalImage) {
      modalImage.src = imageUrl;
    }

    // Open the modal
    if (this.viewImageModalInstance) {
      this.viewImageModalInstance.show();
      this.viewImageModal.nativeElement.removeAttribute('aria-hidden');
    }
  }

  get galleryImageCount(): number {
    return this.galleryImages.length;
  }

  openDeleteModal(imageId: number): void {
    this.selectedGalleryImageId = imageId;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal(): void {
    if (this.viewImageModalInstance) {
      this.viewImageModalInstance.hide();
    }
  }

  hoverIn(event: MouseEvent): void {
    const overlay = (event.target as HTMLElement).querySelector(
      '.image-details-overlay'
    ) as HTMLElement;
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'all';
    }
  }

  hoverOut(event: MouseEvent): void {
    const overlay = (event.target as HTMLElement).querySelector(
      '.image-details-overlay'
    ) as HTMLElement;
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
  }

  deleteGalleryImage(id: number): void {
    if (!id) {
      console.error('No Id provided for deletion');
      return;
    }

    this.galleryImageService.deleteGalleryImage(id).subscribe({
      next: () => {
        this.galleryImages = this.galleryImages.filter((gi) => gi.id !== id);
        this.successMessage = 'Image successfully deleted.';
        setTimeout(() => (this.successMessage = null), 3000);

        this.loadGalleryImages(this.galleryId);

        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error deleting gallery image', err);
      },
    });
  }

  goBack() {
    this.router.navigate(['/galleries']);
  }
}
