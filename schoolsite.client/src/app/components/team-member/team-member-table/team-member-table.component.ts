import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var bootstrap: any;

@Component({
  selector: 'team-member-table',
  templateUrl: './team-member-table.component.html',
  styleUrl: './team-member-table.component.css',
})
export class TeamMemberTableComponent implements OnInit, AfterViewInit {
  teamMembers: TeamMember[] = [];
  selectedTeamMemberId: number | null = null;
  modalInstance: any;
  viewImageModalInstance: any;
  imageToView: string | null = null;

  displayedColumns: string[] = [
    'imagePath',
    'name',
    'role',
    'department',
    'bio',
    'actions',
  ];

  dataSource: MatTableDataSource<TeamMember> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('viewImageModal') viewImageModal!: ElementRef;

  constructor(
    private teamMemberService: TeamMemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchTeamMembers();
  }

  ngAfterViewInit() {
    // Initialize sort functionality
    this.dataSource.sort = this.sort;

    // Initialize the image modal
    if (this.viewImageModal) {
      this.viewImageModalInstance = new bootstrap.Modal(
        this.viewImageModal.nativeElement
      );
    }

    // Initialize the delete modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  // Fetch the team members from the API
  fetchTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
      this.teamMembers = data;
      this.dataSource.data = this.teamMembers;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getImageUrl(imagePath: string | null): string {
    if (imagePath) {
      return `https://localhost:7047/${imagePath}`;
    }
    return 'https://localhost:7047/Uploads/images/user.png';
  }

  viewImage(imageUrl: string, event: Event): void {
    if (imageUrl.includes('user.png')) {
      return; // Do nothing if it's the base image
    }

    event.stopPropagation();
    // Set the image source in the modal
    const modalImage = document.getElementById(
      'modalImage'
    ) as HTMLImageElement;
    if (modalImage) {
      modalImage.src = imageUrl;
    }

    // Open the modal
    if (this.viewImageModalInstance) {
      this.viewImageModalInstance.show();
    }
  }

  deleteTeamMember(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }
    this.teamMemberService.deleteTeamMember(id).subscribe({
      next: () => {
        this.teamMembers = this.teamMembers.filter((tm) => tm.id != id);

        this.dataSource.data = [...this.teamMembers];

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting team member', err);
      },
    });
  }

  editTeamMember(id: number): void {
    this.router.navigate(['/team-members/edit', id]);
  }
}
