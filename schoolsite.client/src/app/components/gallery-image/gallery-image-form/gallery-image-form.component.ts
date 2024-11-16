import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-image-form',
  templateUrl: './gallery-image-form.component.html',
  styleUrl: './gallery-image-form.component.css',
})
export class GalleryImageFormComponent implements OnInit {
  galleryImage: GalleryImage = {
    id: 0,
    imagePath: '',
    createdDate: new Date(),
    galleryId: 0,
  };

  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private galleryImageService: GalleryImageService,
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const galleryImageId = params.get('imageId'); // Assuming `imageId` is the param name for editing
      const galleryId = params.get('galleryId'); // Assuming `galleryId` is a param for the selected gallery

      if (galleryId != null) {
        this.galleryImage.galleryId = +galleryId;
      } else {
        this.errorMessage = 'No gallery selected.';
        return;
      }

      if (galleryImageId) {
        this.isEditing = true;
        this.galleryImageService
          .getGalleryImageById(+galleryImageId)
          .subscribe({
            next: (result) => {
              this.galleryImage = result;
              this.galleryImage.galleryId = +galleryId; // Ensure galleryId is correct
            },
            error: (err) =>
              (this.errorMessage = `Error occurred (${err.status})`),
          });
      }
    });
  }

  onSubmit(): void {
    console.log('Submitting: ', this.galleryImage);

    if (this.isEditing) {
      this.galleryImageService.editGalleryImage(this.galleryImage).subscribe({
        next: () => {
          this.router.navigate([
            '/galleries',
            this.galleryImage.galleryId,
            'images',
          ]);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        },
      });
    } else {
      // Creating a new gallery image
      this.galleryImageService.createGalleryImage(this.galleryImage).subscribe({
        next: () => {
          this.router.navigate([
            '/galleries',
            this.galleryImage.galleryId,
            'images',
          ]);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/galleries', this.galleryImage.galleryId, 'images']);
  }
}
