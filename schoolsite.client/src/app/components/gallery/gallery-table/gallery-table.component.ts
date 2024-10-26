import { Component } from '@angular/core';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gallery-table',
  templateUrl: './gallery-table.component.html',
  styleUrl: './gallery-table.component.css'
})
export class GalleryTableComponent {

  galleries: Gallery[] = [];

  constructor(private galleryService: GalleryService, private router: Router){}

  ngOnInit() {
    this.galleryService.getGallerys().subscribe((data: Gallery[]) => {
      this.galleries = data;
      console.log(data);
    });
  }

  deleteGallery(id: number) : void {
    this.galleryService.deleteGallery(id).subscribe({
      next: () => {
        this.galleries = this.galleries.filter(g => g.id != id);
      },
      error: (err) => {
        console.error('Error for deleting gallery', err);
      }
    });
  }

  editGallery(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
