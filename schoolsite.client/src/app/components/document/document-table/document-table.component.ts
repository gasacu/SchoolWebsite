import { Component } from '@angular/core';
import { Document } from '../../../../entities/document';
import { DocumentService } from '../../../services/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'document-table',
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css'
})
export class DocumentTableComponent {

  documents: Document[] = [];

  constructor(private documentService: DocumentService, private router: Router){}

  ngOnInit() {
    this.documentService.getDocuments().subscribe((data: Document[]) => {
      this.documents = data;
      console.log(data);
    });
  }

  deleteDocument(id: number) : void {
    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        this.documents = this.documents.filter(d => d.id != id);
      },
      error: (err) => {
        console.error('Error for deleting document', err);
      }
    });
  }

  editDocument(id: number) : void {
    this.router.navigate(['/documents/edit', id]);
  }

}
