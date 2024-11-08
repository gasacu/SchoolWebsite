import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Gallery } from '../../../../entities/gallery';
import { GalleryService } from '../../../services/gallery.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var bootstrap: any;

@Component({
  selector: 'gallery-table',
  templateUrl: './gallery-table.component.html',
  styleUrl: './gallery-table.component.css',
})
export class GalleryTableComponent implements OnInit, AfterViewInit {
  galleries: Gallery[] = [];
  selectedGalleryId: number | null = null;
  modalInstance: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'createdDate',
    'updatedDate',
    'actions',
  ];

  dataSource: MatTableDataSource<Gallery> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(private galleryService: GalleryService, private router: Router) {}

  ngOnInit() {
    this.fetchGalleries();
  }

  ngAfterViewInit() {
    // Initialize sort functionality
    this.dataSource.sort = this.sort;
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  // Fetch the galleries from the API
  fetchGalleries(): void {
    this.galleryService.getGallerys().subscribe((data: Gallery[]) => {
      this.galleries = data;
      this.dataSource.data = this.galleries;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteGallery(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.galleryService.deleteGallery(id).subscribe({
      next: () => {
        this.galleries = this.galleries.filter((g) => g.id != id);

        this.dataSource.data = [...this.galleries];

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
