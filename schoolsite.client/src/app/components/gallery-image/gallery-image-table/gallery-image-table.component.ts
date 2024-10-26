import { Component } from '@angular/core';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gallery-image-table',
  templateUrl: './gallery-image-table.component.html',
  styleUrl: './gallery-image-table.component.css'
})
export class GalleryImageTableComponent {

  galleryImages: GalleryImage[] = [];

  constructor(private galleryImageService: GalleryImageService, private router: Router){}

  ngOnInit() {
    this.galleryImageService.getGalleryImages().subscribe((data: GalleryImage[]) => {
      this.galleryImages = data;
      console.log(data);
    });
  }

  deleteGalleryImage(id: number) : void {
    this.galleryImageService.deleteGalleryImage(id).subscribe({
      next: () => {
        this.galleryImages = this.galleryImages.filter(gi => gi.id != id);
      },
      error: (err) => {
        console.error('Error for deleting gallery image', err);
      }
    });
  }

  editGalleryImage(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
