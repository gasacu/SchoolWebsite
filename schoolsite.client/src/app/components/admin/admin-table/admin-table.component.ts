import { Component, ElementRef, ViewChild } from '@angular/core';
import { Admin } from '../../../../entities/admin';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent {
  admins: Admin[] = [];
  selectedAdminId: number | null = null;
  modalInstance: any;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminService.getAdmins().subscribe((data: Admin[]) => {
      this.admins = data;
      console.log(data);
    });
  }

  ngAfterViewInit() {
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  deleteAdmin(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        this.admins = this.admins.filter((a) => a.id != id);

        //Close the modal
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
      error: (err) => {
        console.error('Error for deleting admin', err);
      },
    });
  }

  editAdmin(id: number): void {
    this.router.navigate(['/admins/edit', id]);
  }
}
