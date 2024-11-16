import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Document } from '../../../../entities/document';
import { DocumentService } from '../../../services/document.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

declare var bootstrap: any;

@Component({
  selector: 'document-table',
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css',
})
export class DocumentTableComponent implements OnInit, AfterViewInit {
  documents: Document[] = [];
  selectedDocumentId: number | null = null;
  modalInstance: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'documentUrl',
    'isEvent',
    'actions',
  ];

  dataSource: MatTableDataSource<Document> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchDocuments();
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

  // Fetch documents from the API
  fetchDocuments(): void {
    this.documentService.getDocuments().subscribe((data: Document[]) => {
      this.documents = data;
      this.dataSource.data = this.documents;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteDocument(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        this.documents = this.documents.filter((d) => d.id != id);

        this.dataSource.data = [...this.documents];

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting document', err);
      },
    });
  }

  editDocument(id: number): void {
    this.router.navigate(['/documents/edit', id]);
  }
}
