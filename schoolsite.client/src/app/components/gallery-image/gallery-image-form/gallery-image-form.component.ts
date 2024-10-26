import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleryImage } from '../../../../entities/galleryImage';
import { GalleryImageService } from '../../../services/gallery-image.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-image-form',
  templateUrl: './gallery-image-form.component.html',
  styleUrl: './gallery-image-form.component.css'
})
export class GalleryImageFormComponent implements OnInit {

  galleryImage: GalleryImage = {
    id: 0,
    imagePath: '',
    description: '',
    uploadedAt: new Date()
  }

  isEditing: boolean = false;

  errorMessage : string = "";

  constructor(
    private galleryImageService: GalleryImageService, 
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if(id) {
        // editing gallery image
        this.isEditing = true;

        this.galleryImageService.getGalleryImageById(Number(id)).subscribe({
          next: (result) => this.galleryImage = result,
          error: (err) => this.errorMessage = `Error Occured (${err.status})`
        })
      }
    });    
  }

  onSubmit() : void {

    if(this.isEditing) {
      this.galleryImageService.editGalleryImage(this.galleryImage)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        }
      });

    } else {
      // creating
      this.galleryImageService.createGalleryImage(this.galleryImage)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        }
      });
    }
  }

}
