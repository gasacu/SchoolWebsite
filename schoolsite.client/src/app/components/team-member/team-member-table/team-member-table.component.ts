import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { TeamMemberSharedService } from '../../../services/team-member-shared.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { finalize } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'team-member-table',
  templateUrl: './team-member-table.component.html',
  styleUrl: './team-member-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('exampleModal') exampleModal!: ElementRef;
  @ViewChild('viewImageModal') viewImageModal!: ElementRef;

  constructor(
    private teamMemberService: TeamMemberService,
    private sharedService: TeamMemberSharedService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sharedService.refreshNeeded$.subscribe(() => {
      this.fetchTeamMembers();
    });

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

    this.dataSource.paginator = this.paginator;
  }

  // Fetch the team members from the API
  fetchTeamMembers(): void {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
      setTimeout(() => {
        this.teamMembers = data;
        this.dataSource.data = this.teamMembers;
        this.cdr.markForCheck();
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getImageUrl(imagePath: string | null): string {
    if (imagePath && imagePath.trim()) {
      return `https://localhost:7047/${imagePath}?timestamp=${new Date().getTime()}`;
    }
    return 'https://localhost:7047/Uploads/images/team-members/user.png';
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

    this.teamMemberService
      .deleteTeamMember(id)
      .pipe(
        finalize(() => {
          //Close the modal
          if (this.modalInstance) {
            this.modalInstance.hide();
          }
          this.fetchTeamMembers();
        })
      )
      .subscribe({
        next: () => {
          this.teamMembers = this.teamMembers.filter((tm) => tm.id != id);
          this.dataSource.data = [...this.teamMembers];
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
