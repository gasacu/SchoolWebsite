import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-member-form',
  templateUrl: './team-member-form.component.html',
  styleUrl: './team-member-form.component.css',
})
export class TeamMemberFormComponent implements OnInit {
  teamMember: TeamMember = {
    id: 0,
    name: '',
    role: '',
    department: '',
    bio: '',
    imagePath: '',
  };

  isEditing: boolean = false;

  errorMessage: string = '';

  constructor(
    private teamMemberService: TeamMemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if (id) {
        // editing team member
        this.isEditing = true;

        this.teamMemberService.getTeamMemberById(Number(id)).subscribe({
          next: (result) => (this.teamMember = result),
          error: (err) => (this.errorMessage = `Error Occured (${err.status})`),
        });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.teamMemberService.editTeamMember(this.teamMember).subscribe({
        next: () => {
          this.router.navigate(['/team-members']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        },
      });
    } else {
      // creating
      this.teamMemberService.createTeamMember(this.teamMember).subscribe({
        next: () => {
          this.router.navigate(['/team-members']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/team-members']);
  }
}
