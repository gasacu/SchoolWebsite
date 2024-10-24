import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { DocumentTableComponent } from './document-table/document-table.component';
import { EventTableComponent } from './event-table/event-table.component';
import { GalleryImageTableComponent } from './gallery-image-table/gallery-image-table.component';
import { GalleryTableComponent } from './gallery-table/gallery-table.component';
import { PageContentTableComponent } from './page-content-table/page-content-table.component';
import { TeamMemberTableComponent } from './team-member-table/team-member-table.component';
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'schoolsite.client';
}
