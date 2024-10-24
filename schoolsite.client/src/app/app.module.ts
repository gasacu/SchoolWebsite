import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { DocumentTableComponent } from './document-table/document-table.component';
import { EventTableComponent } from './event-table/event-table.component';
import { GalleryImageTableComponent } from './gallery-image-table/gallery-image-table.component';
import { GalleryTableComponent } from './gallery-table/gallery-table.component';
import { PageContentTableComponent } from './page-content-table/page-content-table.component';
import { TeamMemberTableComponent } from './team-member-table/team-member-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTableComponent,
    DocumentTableComponent,
    EventTableComponent,
    GalleryImageTableComponent,
    GalleryTableComponent,
    PageContentTableComponent,
    TeamMemberTableComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent,  pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }