import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'team-member-table',
  templateUrl: './team-member-table.component.html',
  styleUrl: './team-member-table.component.css'
})
export class TeamMemberTableComponent {

  teamMembers: TeamMember[] = [];

  constructor(private teamMemberService: TeamMemberService, private router: Router){}

  ngOnInit() {
    this.teamMemberService.getTeamMembers().subscribe((data: TeamMember[]) => {
      this.teamMembers = data;
      console.log(data);
    });
  }

  deleteTeamMember(id: number) : void {
    this.teamMemberService.deleteTeamMember(id).subscribe({
      next: () => {
        this.teamMembers = this.teamMembers.filter(tm => tm.id != id);
      },
      error: (err) => {
        console.error('Error for deleting team member', err);
      }
    });
  }

  editTeamMember(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
