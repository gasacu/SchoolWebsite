import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gallery } from '../../../../entities/gallery';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { GalleryService } from '../../../services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrl: './gallery-form.component.css'
})
export class GalleryFormComponent implements OnInit {

  gallery: Gallery = {
    id: 0,
    title: '',
    description: '',
    createdDate: new Date(),
    updatedDate: new Date()
  }

  isEditing: boolean = false;

  errorMessage : string = "";

  constructor(
    private galleryService: GalleryService, 
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if(id) {
        // editing gallery
        this.isEditing = true;

        this.galleryService.getGalleryById(Number(id)).subscribe({
          next: (result) => this.gallery = result,
          error: (err) => this.errorMessage = `Error Occured (${err.status})`
        })
      }
    });    
  }

  onSubmit() : void {

    if(this.isEditing) {
      this.galleryService.editGallery(this.gallery)
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
      this.galleryService.createGallery(this.gallery)
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
