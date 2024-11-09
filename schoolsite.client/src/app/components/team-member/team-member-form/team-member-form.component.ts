import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

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

  imgPath: string | null = null;
  selectedFileName: string | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';
  imageToView: string | null = null;
  modalInstance: any;

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
          next: (result) => {
            this.teamMember = result;
            this.imgPath = this.teamMember.imagePath
              ? `https://localhost:7047/${this.teamMember.imagePath}`
              : 'https://localhost:7047/Uploads/images/user.png';

            // Set selectedFileName to the existing image filename if it exists
            this.selectedFileName = this.teamMember.imagePath
              ? this.teamMember.imagePath.split('/').pop() || null
              : null;
          },
          error: (err) => (this.errorMessage = `Error Occured (${err.status})`),
        });
      } else {
        this.imgPath = 'https://localhost:7047/Uploads/images/user.png';
        this.selectedFileName = null;
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.teamMemberService.uploadImage(file).subscribe({
        next: (response) => {
          this.imgPath = `https://localhost:7047/${response.path}`;
          this.teamMember.imagePath = response.path;
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.errorMessage = 'Failed to upload image.';
        },
      });
    }
  }

  viewImage(imageUrl: string): void {
    if (imageUrl.includes('user.png')) {
      return; // Do nothing if it's the base image
    }

    this.imageToView = imageUrl;

    // Show the modal with the image
    const modal = document.getElementById('viewImageModal') as any;
    if (modal) {
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
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
