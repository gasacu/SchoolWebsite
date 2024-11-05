import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'gallery-table',
  templateUrl: './gallery-table.component.html',
  styleUrl: './gallery-table.component.css',
})
export class GalleryTableComponent {
  galleries: Gallery[] = [];
  selectedGalleryId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(private galleryService: GalleryService, private router: Router) {}

  ngOnInit() {
    this.galleryService.getGallerys().subscribe((data: Gallery[]) => {
      this.galleries = data;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  deleteGallery(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.galleryService.deleteGallery(id).subscribe({
      next: () => {
        this.galleries = this.galleries.filter((g) => g.id != id);

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting gallery', err);
      },
    });
  }

  editGallery(id: number): void {
    this.router.navigate(['/galleries/edit', id]);
  }
}
