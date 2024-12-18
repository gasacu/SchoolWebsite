import { Component, OnInit } from '@angular/core';
import { Document } from '../../../../entities/document';
import { DocumentService } from '../../../services/document.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrl: './document-form.component.css',
})
export class DocumentFormComponent implements OnInit {
  document: Document = {
    id: 0,
    title: '',
    documentUrl: '',
    isEvent: false,
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        // editing document
        this.isEditing = true;

        this.documentService.getDocumentById(Number(id)).subscribe({
          next: (result) => (this.document = result),
          error: (err) => (this.errorMessage = `Error Occured (${err.status})`),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.documentService.editDocument(this.document).subscribe({
        next: () => {
          this.router.navigate(['/documents']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        },
      });
    } else {
      // creating
      console.log('Payload being sent:', this.document);
      this.documentService.createDocument(this.document).subscribe({
        next: () => {
          this.router.navigate(['/documents']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/documents']);
  }
}
