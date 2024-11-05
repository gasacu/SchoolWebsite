import { Component, ElementRef, ViewChild } from '@angular/core';
import { PageContent } from '../../../../entities/pageContent';
import { PageContentService } from '../../../services/page-content.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'page-content-table',
  templateUrl: './page-content-table.component.html',
  styleUrl: './page-content-table.component.css',
})
export class PageContentTableComponent {
  pageContents: PageContent[] = [];
  selectedPageContentId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private pageContentService: PageContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageContentService
      .getPageContents()
      .subscribe((data: PageContent[]) => {
        this.pageContents = data;
        console.log(data);
      });
  }

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  deletePageContent(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.pageContentService.deletePageContent(id).subscribe({
      next: () => {
        this.pageContents = this.pageContents.filter((pc) => pc.id != id);

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
