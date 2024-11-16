import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminTableComponent } from './components/admin/admin-table/admin-table.component';
import { DocumentTableComponent } from './components/document/document-table/document-table.component';
import { GalleryImageTableComponent } from './components/gallery-image/gallery-image-table/gallery-image-table.component';
import { GalleryTableComponent } from './components/gallery/gallery-table/gallery-table.component';
import { PageContentTableComponent } from './components/page-content/page-content-table/page-content-table.component';
import { TeamMemberTableComponent } from './components/team-member/team-member-table/team-member-table.component';
import { AdminFormComponent } from './components/admin/admin-form/admin-form.component';
import { DocumentFormComponent } from './components/document/document-form/document-form.component';
import { GalleryImageFormComponent } from './components/gallery-image/gallery-image-form/gallery-image-form.component';
import { GalleryFormComponent } from './components/gallery/gallery-form/gallery-form.component';
import { PageContentFormComponent } from './components/page-content/page-content-form/page-content-form.component';
import { TeamMemberFormComponent } from './components/team-member/team-member-form/team-member-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    AdminTableComponent,
    DocumentTableComponent,
    GalleryImageTableComponent,
    GalleryTableComponent,
    PageContentTableComponent,
    TeamMemberTableComponent,
    AdminFormComponent,
    DocumentFormComponent,
    GalleryImageFormComponent,
    GalleryFormComponent,
    PageContentFormComponent,
    TeamMemberFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
