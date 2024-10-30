import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminTableComponent } from './components/admin/admin-table/admin-table.component';
import { DocumentTableComponent } from './components/document/document-table/document-table.component';
import { GalleryImageTableComponent } from './components/gallery-image/gallery-image-table/gallery-image-table.component';
import { GalleryTableComponent } from './components/gallery/gallery-table/gallery-table.component';
import { PageContentTableComponent } from './components/page-content/page-content-table/page-content-table.component';
import { TeamMemberTableComponent } from './components/team-member/team-member-table/team-member-table.component';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'schoolsite.client';
}
