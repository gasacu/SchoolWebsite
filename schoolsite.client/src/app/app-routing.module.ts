import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin components
import { AdminTableComponent } from './components/admin/admin-table/admin-table.component';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';

// Document components
import { DocumentTableComponent } from './components/document/document-table/document-table.component';
import { DocumentFormComponent } from './components/document/document-form/document-form.component';

// Gallery components
import { GalleryTableComponent } from './components/gallery/gallery-table/gallery-table.component';
import { GalleryFormComponent } from './components/gallery/gallery-form/gallery-form.component';

// GalleryImage components
import { GalleryImageTableComponent } from './components/gallery-image/gallery-image-table/gallery-image-table.component';
import { GalleryImageFormComponent } from './components/gallery-image/gallery-image-form/gallery-image-form.component';

// PageContent components
import { PageContentTableComponent } from './components/page-content/page-content-table/page-content-table.component';
import { PageContentFormComponent } from './components/page-content/page-content-form/page-content-form.component';

// TeamMember components
import { TeamMemberTableComponent } from './components/team-member/team-member-table/team-member-table.component';
import { TeamMemberFormComponent } from './components/team-member/team-member-form/team-member-form.component';

const routes: Routes = [
  // Admin routes
  { path: 'admins', component: AdminTableComponent },
  { path: 'admins/create', component: AdminFormComponent },
  { path: 'admins/edit/:id', component: AdminFormComponent },

  // Document routes
  { path: 'documents', component: DocumentTableComponent },
  { path: 'documents/create', component: DocumentFormComponent },
  { path: 'documents/edit/:id', component: DocumentFormComponent },

  // Gallery routes
  { path: 'galleries', component: GalleryTableComponent },
  { path: 'galleries/create', component: GalleryFormComponent },
  { path: 'galleries/edit/:id', component: GalleryFormComponent },

  // GalleryImage routes
  { path: 'gallery-images', component: GalleryImageTableComponent },
  {
    path: 'gallery-images/create/:galleryId',
    component: GalleryImageFormComponent,
  },
  { path: 'gallery-images/edit/:id', component: GalleryImageFormComponent },

  // PageContent routes
  { path: 'page-contents', component: PageContentTableComponent },
  { path: 'page-contents/create', component: PageContentFormComponent },
  { path: 'page-contents/edit/:id', component: PageContentFormComponent },

  // TeamMember routes
  { path: 'team-members', component: TeamMemberTableComponent },
  { path: 'team-members/create', component: TeamMemberFormComponent },
  { path: 'team-members/edit/:id', component: TeamMemberFormComponent },

  // Fallback for undefined routes
  { path: '', redirectTo: '/page-contents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
