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
import { MatPaginator } from '@angular/material/paginator';

declare var bootstrap: any;

@Component({
  selector: 'gallery-table',
  templateUrl: './gallery-table.component.html',
  styleUrl: './gallery-table.component.css',
})
export class GalleryTableComponent implements OnInit, AfterViewInit {
  galleries: Gallery[] = [];
  selectedGalleryId: number | null = null;
  filteredGalleries: Gallery[] = [];
  availableYears: string[] = [];
  selectedYear: string = 'All';
  modalInstance: any;

  displayedColumns: string[] = [
    'year',
    'title',
    'description',
    'createdDate',
    'updatedDate',
    'actions',
  ];

  dataSource: MatTableDataSource<Gallery> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

    this.dataSource.paginator = this.paginator;
  }

  // Fetch the galleries from the API
  fetchGalleries(): void {
    this.galleryService.getGallerys().subscribe((data: Gallery[]) => {
      this.galleries = data;

      this.availableYears = Array.from(
        new Set(this.galleries.map((g) => g.year))
      );

      this.dataSource.data = this.galleries;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyYearFilter(selectedYear: string): void {
    if (selectedYear) {
      this.dataSource.data = this.galleries.filter(
        (g) => g.year === selectedYear
      );
    } else {
      this.dataSource.data = this.galleries; // Reset to all data if no year is selected
    }
  }

  filterByYear(): void {
    if (this.selectedYear === 'All') {
      this.filteredGalleries = [...this.galleries];
    } else {
      this.filteredGalleries = this.galleries.filter(
        (gallery) => gallery.year === this.selectedYear
      );
    }
    this.dataSource.data = this.filteredGalleries;
  }

  navigateToGalleryImages(galleryId: number, event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('btn-danger')) {
      event.stopPropagation();
      return;
    }

    this.router.navigate(['/galleries', galleryId, 'images']);
  }

  deleteGallery(id: number): void {
    console.log('Gallery ID to delete: ', id);
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.galleryService.deleteGallery(id).subscribe({
      next: () => {
        this.galleries = this.galleries.filter((g) => g.id != id);
        this.filterByYear();
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
