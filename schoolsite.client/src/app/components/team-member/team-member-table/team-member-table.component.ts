import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'team-member-table',
  templateUrl: './team-member-table.component.html',
  styleUrl: './team-member-table.component.css',
})
export class TeamMemberTableComponent {
  teamMembers: TeamMember[] = [];
  selectedTeamMemberId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(
    private teamMemberService: TeamMemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.teamMemberService.getTeamMembers().subscribe((data: TeamMember[]) => {
      this.teamMembers = data;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
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
