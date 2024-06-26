import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdminProfileService } from '../../services/admin-profile.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute correctly
import { onlyLettersValidator, alphanumericValidator, emailFormatValidator,numericValidator } from './custom-validators'; // Import custom validators

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  adminId!: number;
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  emailError: boolean = false; // New property


  constructor(
    private fb: FormBuilder,
    private adminProfileService: AdminProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    
    this.updateProfileForm = this.fb.group({
      first_name: ['', [Validators.required, onlyLettersValidator()]],
      last_name: ['', [Validators.required, onlyLettersValidator()]],
      email: ['', [Validators.required,Validators.email, emailFormatValidator()]],
      // email: ['', [Validators.required,Validators.email, Validators.email]],
      phone_number: ['', [Validators.required,numericValidator()]],
      territory: ['', [Validators.required, onlyLettersValidator()]],
      city: ['', [Validators.required, onlyLettersValidator()]],
      state: ['', [Validators.required, onlyLettersValidator()]],
      street: ['', [Validators.required, alphanumericValidator()]],
      image: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.adminId = +id;
      this.loadAdminProfile(this.adminId);
    }
  }

  loadAdminProfile(id: number): void {
    this.adminProfileService.getAdminProfile(id).subscribe(
      response => {
      if (response) {
        this.updateProfileForm.patchValue(response);
      }
    },
    (error: any) => { // Specify error type to avoid implicit any error
      console.error('Error loading user profile:', error);
      // Handle error as needed
    }
  );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.updateProfileForm.patchValue({ image: this.selectedFile });
    }
  }

  onSubmit(): void {
    this.emailError = false; // Reset email error
    if (this.updateProfileForm.valid) {
      // Check if image is required
      if (!this.selectedFile) {
        this.errorMessage = 'The image is required';
        return;
      }

      const formData = new FormData();
      Object.keys(this.updateProfileForm.value).forEach(key => {
        formData.append(key, this.updateProfileForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.adminProfileService.updateAdminProfile(this.adminId, formData).subscribe(
        response => {
          this.messageService.showMessage('Profile updated successfully');
          this.router.navigate(['/admin-dashboard/admin-profile', this.adminId]);
        },
        error => {
          if (error.status === 400) {
            this.emailError = true; // Set email error to true
          } else {
            this.errorMessage = 'An error occurred';
          }
        }
      );
    }
  }
  
}