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
import { Subscription } from 'rxjs';

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
    faculty: '',
    specialty: '',
    imagePath: '',
  };

  departments: { value: string; description: string }[] = [];
  imgPath: string =
    'https://localhost:7047/Uploads/images/team-members/user.png';
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  isEditing: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  imageToView: string | null = null;
  modalInstance: any;
  deleteImageModalInstance: any;
  private routeSub!: Subscription;
  uploading = false;
  dragging: boolean = false;

  @ViewChild('deleteImageModal') deleteImageModal!: ElementRef;

  constructor(
    private teamMemberService: TeamMemberService,
    private sharedService: TeamMemberSharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamMemberService.getDepartments().subscribe({
      next: (data) => (this.departments = data),
      error: (err) => (this.errorMessage = 'Error fetching departments'),
    });

    this.routeSub = this.route.paramMap.subscribe((result) => {
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
                : 'https://localhost:7047/Uploads/images/team-members/user.png';

              // Set selectedFileName to the existing image filename if it exists
              this.selectedFileName = this.teamMember.imagePath
                ? this.teamMember.imagePath.split('/').pop() || null
                : null;
            },
            error: (err) =>
              (this.errorMessage = `Error Occured (${err.status})`),
          });
        } else {
          this.imgPath =
            'https://localhost:7047/Uploads/images/team-members/user.png';
          this.selectedFileName = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    //Initialize the delete modal instance
    if (this.deleteImageModal) {
      this.deleteImageModalInstance = new bootstrap.Modal(
        this.deleteImageModal.nativeElement
      );
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  openDeleteImageModal(): void {
    if (this.deleteImageModalInstance) {
      this.deleteImageModalInstance.show();
    }
  }

  onDragLeave(event: DragEvent) {
    this.dragging = false;
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/svg',
        'image/webp',
        'image/tiff',
      ];
      if (!validTypes.includes(file.type)) {
        this.errorMessage =
          'Invalid file type. Please select a valid image file.';
        return;
      }

      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    this.uploading = true;
    const formData = new FormData();
    formData.append('image', file);

    this.selectedFileName = file.name;
    this.selectedFile = file;

    // Simulate backend call
    setTimeout(() => {
      this.uploading = false;
      this.imgPath = URL.createObjectURL(file);
    }, 2000);
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
      this.imgPath =
        'https://localhost:7047/Uploads/images/team-members/user.png';
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
          this.imgPath =
            'https://localhost:7047/Uploads/images/team-members/user.png';
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

  onSubmit(event: Event): void {
    event.preventDefault();
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
          this.teamMember.imagePath = response.path;
          this.saveTeamMember();
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
        'https://localhost:7047/Uploads/images/team-members/user.png'
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
