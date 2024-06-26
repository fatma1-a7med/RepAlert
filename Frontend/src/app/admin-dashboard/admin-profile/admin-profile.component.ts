import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminProfileService } from '../../services/admin-profile.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  adminProfile: any = []; // Variable to hold admin profile data
  adminId!: number; // Using definite assignment assertion
  successMessage: string | null = null;


  constructor(
    private adminProfileService: AdminProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminId = +id;
      this.getAdminProfile(this.adminId);
    } else {
      console.error('Admin ID parameter is null or undefined');
      // Handle the case where 'id' is null, e.g., navigate to an error page
    }

    this.messageService.message$.subscribe(message => {
      this.successMessage = message;
      setTimeout(() => this.successMessage = null, 3000); // Hide message after 3 seconds
    });
  }

  // Method to fetch admin profile based on adminId
  getAdminProfile(id: number): void {
    this.adminProfileService.getAdminProfile(id)
      .subscribe(
        (response) => {
          console.log(response);
          
          if (response) { // Assuming the API response has a 'success' fla

            this.adminProfile.push(response); // Assuming the API response has a 'data' property
            console.log(this.adminProfile);
            
            if (this.adminProfile) {
              // Assuming image path is relative and needs prefixing with server URL
              this.adminProfile.image = `http://localhost:8000/images/${this.adminProfile[0].image}`;
            }
          } else {
            console.error('No data found in API response or API error');
          }
        },
        (error) => {
          this.router.navigate(['/NotFound']);
          // Handle error as needed
        }
      );
  }

  // Method to navigate to update profile component
  navigateToUpdateProfile(): void {
    this.router.navigate(['/admin-dashboard/update-profile/update', this.adminId]);
  }
}