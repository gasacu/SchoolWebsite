import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageContent } from '../../../../entities/pageContent';
import { PageContentService } from '../../../services/page-content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-content-form',
  templateUrl: './page-content-form.component.html',
  styleUrl: './page-content-form.component.css'
})
export class PageContentFormComponent implements OnInit {

  pageContent: PageContent = {
    id: 0,
    pageName: '',
    content: ''
  }

  isEditing: boolean = false;

  errorMessage : string = "";

  constructor(
    private pageContentService: PageContentService, 
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if(id) {
        // editing page content
        this.isEditing = true;

        this.pageContentService.getPageContentById(Number(id)).subscribe({
          next: (result) => this.pageContent = result,
          error: (err) => this.errorMessage = `Error Occured (${err.status})`
        })
      }
    });    
  }

  onSubmit() : void {

    if(this.isEditing) {
      this.pageContentService.editPageContent(this.pageContent)
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
      this.pageContentService.createPageContent(this.pageContent)
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
