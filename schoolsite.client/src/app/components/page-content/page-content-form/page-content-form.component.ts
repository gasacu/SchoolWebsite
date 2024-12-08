import { Component, OnInit } from '@angular/core';
import { PageContent } from '../../../../entities/pageContent';
import { PageContentService } from '../../../services/page-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-page-content-form',
  templateUrl: './page-content-form.component.html',
  styleUrl: './page-content-form.component.css',
})
export class PageContentFormComponent implements OnInit {
  pageContent: PageContent = {
    id: 0,
    pageName: '',
    content: '',
    createdDate: new Date(),
    updatedDate: new Date(),
  };

  editorForm!: FormGroup;
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private pageContentService: PageContentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  editorStyle = {
    height: '500px',
    width: '100%',
  };

  // config = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],
  //     ['fontname', 'fontsize'],
  //   ],
  // };

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      pageName: ['', [Validators.required, Validators.maxLength(64)]],
      content: [''],
    });

    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        // editing page content
        this.isEditing = true;

        this.pageContentService.getPageContentById(Number(id)).subscribe({
          next: (result) => {
            this.pageContent = result;
            this.editorForm.patchValue(result);
          },
          error: (err) => (this.errorMessage = `Error Occured (${err.status})`),
        });
      }
    });
  }

  onSubmit(): void {
    this.pageContent.pageName = this.editorForm.value.pageName;
    this.pageContent.content = this.editorForm.value.content;

    if (this.isEditing) {
      this.pageContentService.editPageContent(this.pageContent).subscribe({
        next: () => {
          this.router.navigate(['/page-contents']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        },
      });
    } else {
      // creating
      this.pageContentService.createPageContent(this.pageContent).subscribe({
        next: () => {
          this.router.navigate(['/page-contents']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/page-contents']);
  }
}
