import { Component } from '@angular/core';
import { PageContent } from '../../../../entities/pageContent';
import { PageContentService } from '../../../services/page-content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-content-table',
  templateUrl: './page-content-table.component.html',
  styleUrl: './page-content-table.component.css'
})
export class PageContentTableComponent {

  pageContents: PageContent[] = [];

  constructor(private pageContentService: PageContentService, private router: Router){}

  ngOnInit() {
    this.pageContentService.getPageContents().subscribe((data: PageContent[]) => {
      this.pageContents = data;
      console.log(data);
    });
  }

  deletePageContent(id: number) : void {
    this.pageContentService.deletePageContent(id).subscribe({
      next: () => {
        this.pageContents = this.pageContents.filter(pc => pc.id != id);
      },
      error: (err) => {
        console.error('Error for deleting page content', err);
      }
    });
  }

  editPageContent(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
