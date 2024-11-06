import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { PageContent } from '../../../../entities/pageContent';
import { PageContentService } from '../../../services/page-content.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var bootstrap: any;

@Component({
  selector: 'page-content-table',
  templateUrl: './page-content-table.component.html',
  styleUrl: './page-content-table.component.css',
})
export class PageContentTableComponent implements OnInit, AfterViewInit {
  pageContents: PageContent[] = [];
  selectedPageContentId: number | null = null;
  modalInstance: any;

  displayedColumns: string[] = [
    'id',
    'pageName',
    'content',
    'createdDate',
    'updatedDate',
    'actions',
  ];

  dataSource: MatTableDataSource<PageContent> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private pageContentService: PageContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchPageContents();
  }

  ngAfterViewInit() {
    // Initialize sort functionality
    this.dataSource.sort = this.sort;
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  // Fetch the pages from the API
  fetchPageContents(): void {
    this.pageContentService
      .getPageContents()
      .subscribe((data: PageContent[]) => {
        this.pageContents = data;
        this.dataSource.data = this.pageContents;
      });
  }

  deletePageContent(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.pageContentService.deletePageContent(id).subscribe({
      next: () => {
        this.pageContents = this.pageContents.filter((pc) => pc.id != id);

        this.dataSource.data = [...this.pageContents];

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting page content', err);
      },
    });
  }

  editPageContent(id: number): void {
    this.router.navigate(['/page-contents/edit', id]);
  }
}
