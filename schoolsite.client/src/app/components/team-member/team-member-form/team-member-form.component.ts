import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { TeamMember } from '../../../../entities/teamMember';
import { TeamMemberService } from '../../../services/team-member.service';
import { TeamMemberSharedService } from '../../../services/team-member-shared.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-team-member-form',
  templateUrl: './team-member-form.component.html',
  styleUrl: './team-member-form.component.css',
})
export class TeamMemberFormComponent implements OnInit, AfterViewInit {
  teamMember: TeamMember = {
    id: 0,
    name: '',
    role: '',
    department: '',
    bio: '',
    imagePath: '',
  };

  imgPath: string | null = null;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  imageToView: string | null = null;
  modalInstance: any;
  deleteImageModalInstance: any;

  @ViewChild('deleteImageModal') deleteImageModal!: ElementRef;

  constructor(
    private teamMemberService: TeamMemberService,
    private sharedService: TeamMemberSharedService,
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

  ngAfterViewInit(): void {
    //Initialize the delete modal instance
    if (this.deleteImageModal) {
      this.deleteImageModalInstance = new bootstrap.Modal(
        this.deleteImageModal.nativeElement
      );
    }
  }

  openDeleteImageModal(): void {
    if (this.deleteImageModalInstance) {
      this.deleteImageModalInstance.show();
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.selectedFile = file;
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => (this.imgPath = e.target.result);
    reader.readAsDataURL(file);
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

  deleteImage(): void {
    // reset the preview and selected file
    if (this.selectedFile) {
      this.imgPath = 'https://localhost:7047/Uploads/images/user.png';
      this.selectedFile = null;
      this.selectedFileName = null;

      //Close the modal
      if (this.deleteImageModalInstance) {
        this.deleteImageModalInstance.hide();
      }
    } else {
      const imagePath = this.teamMember.imagePath?.split('/').pop();
      if (!imagePath || imagePath === 'user.png') return;

      // Delete the image from the server
      this.teamMemberService.deleteImage(imagePath).subscribe({
        next: () => {
          this.imgPath = 'https://localhost:7047/Uploads/images/user.png';
          this.teamMember.imagePath = '';
          this.selectedFileName = null;
          this.saveTeamMember();

          //Close the modal
          if (this.deleteImageModalInstance) {
            this.deleteImageModalInstance.hide();
          }
        },
        error: (err) => {
          console.error('Failed to delete image:', err);
          this.errorMessage = 'Failed to delete image from the server.';
        },
      });
    }
  }

  onSubmit(): void {
    if (
      !this.teamMember.name ||
      !this.teamMember.role ||
      !this.teamMember.department
    ) {
      this.errorMessage =
        'Please fill in all required fields before submitting.';
      return;
    }

    if (this.selectedFile) {
      this.teamMemberService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          this.teamMember.imagePath = response.path; // Set the image path after upload
          this.saveTeamMember(); // Now save the team member data
        },
        error: (err) => {
          console.error('Image upload failed:', err);
          this.errorMessage = 'Failed to upload image.';
        },
      });
    } else {
      // No new image selected, save directly
      this.saveTeamMember();
    }
  }

  saveTeamMember(): void {
    if (
      !this.teamMember.imagePath ||
      this.teamMember.imagePath ===
        'https://localhost:7047/Uploads/images/user.png'
    ) {
      this.teamMember.imagePath = ''; // Remove any image reference if it's the default image
    }

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

  goBack(): void {
    this.selectedFile = null;
    this.router.navigate(['/team-members']);
  }
}
