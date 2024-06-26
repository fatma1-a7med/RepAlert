import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']

})

export class UserProfileComponent implements OnInit {

  userProfile: any= []; // Variable to hold user profile data
  userId!: number; // Using definite assignment assertion
  successMessage: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.userId = +id;
      this.getUserProfile(this.userId);
    } else {
      console.error('User ID parameter is null or undefined');
      // Handle the case where 'id' is null, e.g., navigate to an error page
    }

    this.messageService.message$.subscribe(message => {
      this.successMessage = message;
      setTimeout(() => this.successMessage = null, 3000); // Hide message after 3 seconds
    });
  }

  // Method to fetch user profile based on userId
  getUserProfile(id: number): void {
    this.userService.getUserProfile(id)
      .subscribe(
        (response: any) => {
          console.log(response);

          if (response) { // Check if response and data exist
            this.userProfile.push(response); // Assuming the API response has a 'data' property
            console.log(this.userProfile);

            if (this.userProfile) {
              // Assuming image path is relative and needs prefixing with server URL
              this.userProfile.image = `http://localhost:8000/images/${this.userProfile[0].image}`;
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
    this.router.navigate(['user/user-profile/update/', this.userId]);
  }
}