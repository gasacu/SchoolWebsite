import { Component } from '@angular/core';
import { Admin } from '../../../../entities/admin';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {

  admins: Admin[] = [];

  constructor(private adminService: AdminService, private router: Router){}

  ngOnInit() {
    this.adminService.getAdmins().subscribe((data: Admin[]) => {
      this.admins = data;
      console.log(data);
    });
  }

  deleteAdmin(id: number) : void {
    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        this.admins = this.admins.filter(a => a.id != id);
      },
      error: (err) => {
        console.error('Error for deleting admin', err);
      }
    });
  }

  editAdmin(id: number) : void {
    this.router.navigate(['/edit', id]);
  }

}
