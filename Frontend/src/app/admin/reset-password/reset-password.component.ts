import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JarwisService } from '../../services/jarwis.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: JarwisService,
    private router: Router,
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      token: ['']
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.resetPasswordForm.patchValue({ token: this.token });
    console.log(this.token);
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { email, password, password_confirmation, token } = this.resetPasswordForm.value;
      this.authService.resetPassword(token, email, password, password_confirmation).subscribe(
        response => {
          Swal.fire({
            title: 'Success!',
            text: 'Reset password successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Redirect to login page after successful password reset
            this.router.navigate(['/admin/login']);
          });
        },
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Error resetting password.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(error);
        }
      );
    } else {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill in all required fields with valid information.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
