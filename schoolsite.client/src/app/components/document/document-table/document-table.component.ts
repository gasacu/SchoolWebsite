import { Component, ElementRef, ViewChild } from '@angular/core';
import { Document } from '../../../../entities/document';
import { DocumentService } from '../../../services/document.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'document-table',
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css',
})
export class DocumentTableComponent {
  documents: Document[] = [];
  selectedDocumentId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.documentService.getDocuments().subscribe((data: Document[]) => {
      this.documents = data;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  deleteDocument(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        this.documents = this.documents.filter((d) => d.id != id);

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
