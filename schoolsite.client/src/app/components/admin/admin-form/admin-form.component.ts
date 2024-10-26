import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Admin } from '../../../../entities/admin';
import { AdminService } from '../../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent implements OnInit {

  admin: Admin = {
    id: 0,
    fullName: '',
    username: '',
    passwordHash: ''
  }

  isEditing: boolean = false;

  errorMessage : string = "";

  constructor(
    private adminService: AdminService, 
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      const id = result.get('id');

      if(id) {
        // editing admin
        this.isEditing = true;

        this.adminService.getAdminById(Number(id)).subscribe({
          next: (result) => this.admin = result,
          error: (err) => this.errorMessage = `Error Occured (${err.status})`
        })
      }
    });    
  }

  onSubmit() : void {

    if(this.isEditing) {
      this.adminService.editAdmin(this.admin)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during updating (${err.status})`;
        }
      });

    } else {
      // creating
      this.adminService.createAdmin(this.admin)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = `Error Occured during creating (${err.status})`;
        }
      });
    }
  }

}
