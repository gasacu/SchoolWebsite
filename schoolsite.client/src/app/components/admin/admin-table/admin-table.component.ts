import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Admin } from '../../../../entities/admin';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var bootstrap: any;

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css',
})
export class AdminTableComponent implements OnInit, AfterViewInit {
  admins: Admin[] = [];
  selectedAdminId: number | null = null;
  modalInstance: any;

  displayedColumns: string[] = [
    'id',
    'fullName',
    'username',
    'passwordHash',
    'actions',
  ];

  dataSource: MatTableDataSource<Admin> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.fetchAdmins();
  }

  ngAfterViewInit() {
    // Initialize sort functionality
    this.dataSource.sort = this.sort;
    // Initialize the modal instance
    if (this.exampleModal) {
      this.modalInstance = new bootstrap.Modal(this.exampleModal.nativeElement);
    }
  }

  // Fetch the admins from the API
  fetchAdmins(): void {
    this.adminService.getAdmins().subscribe((data: Admin[]) => {
      this.admins = data;
      this.dataSource.data = this.admins;
    });
  }

  deleteAdmin(id: number): void {
    if (id === null) {
      console.error('No Id selected for deletion');
      return;
    }

    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        this.admins = this.admins.filter((a) => a.id != id);

        this.dataSource.data = [...this.admins];

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
