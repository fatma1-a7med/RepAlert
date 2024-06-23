import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'; 
import { MatSelectModule } from '@angular/material/select';
import { SalesService } from '../../../services/user_services/user-services.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [ MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
   ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})

export class AddDoctorComponent implements OnInit {
  @Output() doctorAdded = new EventEmitter<any>();
  userForm: FormGroup;
  isFormSubmitted = false;
  initialDoctorData: any;

  constructor(
    private _fb: FormBuilder,
    private doctorService: SalesService,
    public _dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      last_name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone_number: ['', [Validators.required, Validators.maxLength(20)]],
      class_rate: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', [Validators.required, Validators.maxLength(255)]],
      territory: ['', [Validators.required, Validators.maxLength(255)]],
      specialization: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
      this.initialDoctorData = { ...this.data };
    }
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        phone_number: this.userForm.value.phone_number.toString()
      };

      if (this.data) {
        const updatedDoctorData = {
          ...this.initialDoctorData,
          ...formData
        };

        this.doctorService.updateDoctor(this.data.id, updatedDoctorData).subscribe({
          next: (val: any) => {
            alert('Doctor details updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Update Error:', err);
            this.handleErrorResponse(err);
          }
        });
            } else {
        // Add new doctor
        this.doctorService.AddDoctor(formData).subscribe({
          next: (val: any) => {
            alert('Doctor added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Add Error:', err);
            if (err.status === 422) {
              alert('Failed to add Doctor. Please check the input data.');
              if (err.error.errors) {
                console.error('Validation Errors:', err.error.errors);
              }
            } else {
              alert('An unexpected error occurred. Please try again.');
            }
          }
        });
      }
    }
  }
  private handleErrorResponse(err: any): void {
    if (err.status === 422) {
      if (err.error.errors && err.error.errors.email) {
        alert('The email has already been taken. Please use a different email.');
      } else {
        alert('Failed to update Doctor details. Please check the input data.');
      }
      console.error('Validation Errors:', err.error.errors);
    } else {
      alert('An unexpected error occurred. Please try again.');
    }
  }
}
