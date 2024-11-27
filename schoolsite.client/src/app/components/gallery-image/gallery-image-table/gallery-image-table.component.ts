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
  galleryId!: number;
  selectedGalleryImageId: number | null = null;
  readonly PLACEHOLDER_IMAGE =
    'https://localhost:7047/Uploads/images/team-members/user.png';
  modalInstance: any;
  viewImageModalInstance: any;
  selectedFiles: File[] = [];
  successMessage: string | null = null;
  currentPage = 1;
  pageSize = 6;

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('viewImageModal') viewImageModal!: ElementRef;
  @ViewChild('uploadImageInput') uploadImageInput!: ElementRef;

  constructor(
    private galleryImageService: GalleryImageService,
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
        this.galleryImages = Array.isArray(images) ? images : [];
        this.cdr.detectChanges();
      },
      error: (err) => this.handleError(err, 'image deletion'),
    });
  }

  validateFile(file: File): boolean {
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(extension!)) {
      alert(`${file.name} has an invalid file type.`);
      return false;
    }
    if (file.size > maxSize) {
      alert(`${file.name} exceeds the size limit.`);
      return false;
    }
    return true;
  }

  onMultipleImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const files = Array.from(input.files).filter((file) =>
        this.validateFile(file)
      );
      this.selectedFiles.push(...files);
    }
  }

  fileToUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  removeSelectedFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter((f) => f !== file);

    const inputElement = document.getElementById(
      'uploadImageInput'
    ) as HTMLInputElement;
    if (inputElement) {
      (this.uploadImageInput.nativeElement as HTMLInputElement).value = '';
    }
  }

  uploadMultipleImages(): void {
    if (!this.selectedFiles.length) return;

    const formData = new FormData();
    this.selectedFiles.forEach((file) => formData.append('files', file));
    formData.append('galleryId', this.galleryId.toString());

    this.galleryImageService.uploadMultipleImages(formData).subscribe({
      next: (response) => {
        const images = Array.isArray(response) ? response : [];

        this.galleryImages = [...this.galleryImages, ...images];
        this.selectedFiles = [];
        this.successMessage = 'Images uploaded successfully.';

        setTimeout(() => (this.successMessage = null), 3000);

        this.loadGalleryImages(this.galleryId);
      },
      error: (err) => {
        this.handleError(err, 'image deletion'),
          alert('An error occurred during the upload process.');
      },
    });
  }

  getImageUrl(imagePath: string | null): string {
    return imagePath?.trim()
      ? `https://localhost:7047/${imagePath}?timestamp=${new Date().getTime()}`
      : this.PLACEHOLDER_IMAGE;
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
    if (!imageId) {
      console.error('Invalid image ID provided');
      return;
    }
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
    overlay?.classList.add('active');
  }

  hoverOut(event: MouseEvent): void {
    const overlay = (event.target as HTMLElement).querySelector(
      '.image-details-overlay'
    ) as HTMLElement;
    overlay?.classList.remove('active');
  }

  handleError(err: any, action: string): void {
    const errorMessage =
      err?.error?.message || err.message || 'Unknown error occurred';
    console.error(`Error during ${action}:`, errorMessage);
    alert(`An error occurred during ${action}: ${errorMessage}`);
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
      error: (err) => this.handleError(err, 'image deletion'),
    });
  }

  get paginatedGalleryImages(): GalleryImage[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.galleryImages.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.galleryImages.length / this.pageSize);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['/galleries']);
  }
}
