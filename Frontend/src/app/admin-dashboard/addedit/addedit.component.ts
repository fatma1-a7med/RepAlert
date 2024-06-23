// import { Component, Inject, OnInit ,EventEmitter, Output} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatRadioModule } from '@angular/material/radio';
// import { HttpClientModule } from '@angular/common/http';

// import {MedicalrepService}  from '../../services/medicalrep.service'
// @Component({
//   selector: 'app-addedit',
//   standalone: true,
//   imports: [
//     MatDialogModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatRadioModule,
//     ReactiveFormsModule,
//     HttpClientModule,
//     CommonModule
    
    
//   ],
//   templateUrl: './addedit.component.html',
//   styleUrls: ['./addedit.component.css'] , // Corrected this line
 
// })
// export class AddeditComponent implements OnInit {
//   @Output() medrepAdded = new EventEmitter<any>();
//   userForm: FormGroup;
  

//   constructor(
//     private _fb: FormBuilder, 
//     private _medrepservice:MedicalrepService,
//     public _dialogRef: MatDialogRef<AddeditComponent>,

//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.userForm = this._fb.group({
      
//         first_name: ['', [Validators.required, Validators.maxLength(255)]],
//         last_name: ['', [Validators.required, Validators.maxLength(255)]],
//         state: ['', [Validators.required, Validators.maxLength(255)]],
//         city: ['', [Validators.required, Validators.maxLength(255)]],
//         street: ['', [Validators.required, Validators.maxLength(255)]],
//         gender: ['', [Validators.maxLength(50)]],
//         birthDate: [''],
//         location_id: [''],
//         admin_id: [''],
//         phone_number: ['', [Validators.required, Validators.maxLength(20)]],
//         territory: ['', [Validators.required, Validators.maxLength(255)]],
//         image: [null],
//         email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
//         password: ['', [Validators.required]]
//       }) 
  
//   }

//   ngOnInit(): void {
//    this.userForm.patchValue(this.data)
//    }

//    onSubmit() {
//     if (this.userForm.valid) {
//       if(this.data){
//         this._medrepservice.updatemedrip(this.data.id,this.userForm.value).subscribe({
//           next: (val: any) => {
//               alert('Medicalrep details updated ');
//               this._dialogRef.close(true);  
//           },
//           error: (err: any) => {
//               console.error(err);  
//           },
//       });     
//       } 
//       else{
//         this._medrepservice.addMedrep(this.userForm.value).subscribe({
//             next: (val: any) => {
//                 alert('Medical rep added successfully');
//                 this._dialogRef.close(true);  
//             },
//             error: (err: any) => {
//                 console.error(err);  
//             },
//         });
//       }
//     }
//    }
  
 
 
// }


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
import { MedicalrepService } from '../../services/medicalrep.service';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-addedit',
  standalone: true,
  providers: [DatePipe],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule 
  ],
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {
  @Output() medrepAdded = new EventEmitter<any>();
  userForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _medrepservice: MedicalrepService,
    public _dialogRef: MatDialogRef<AddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.userForm = this._fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      last_name: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      street: ['', [Validators.required, Validators.maxLength(255)]],
      gender: ['', [Validators.required, Validators.pattern(/^(Male|Female)$/)]],
      birthDate: [null, [Validators.required]],
      admin_id: [''],
      phone_number: ['', [Validators.required, Validators.maxLength(20)]],
      territory: ['', [Validators.required, Validators.maxLength(255)]],
      image: [null],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }


  onSubmit() {
    if (this.userForm.valid) {
      const formattedDate = this.datePipe.transform(this.userForm.value.birthDate, 'yyyy-MM-dd');
      this.userForm.patchValue({ birthDate: formattedDate });
  
      const formData = this.userForm.value;
      console.log('Form Data:', formData);
  
      if (this.data) {
        this._medrepservice.updatemedrip(this.data.id, formData).subscribe({
          next: (val: any) => {
            alert('Medical rep details updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Update Error:', err);
            if (err.status === 422) {
              alert('Failed to update medical rep details. Please check the input data.');
            } else {
              alert('An unexpected error occurred. Please try again.');
            }
          }
        });
      } else {
        this._medrepservice.addMedrep(formData).subscribe({
          next: (val: any) => {
            alert('Medical rep added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Add Error:', err);
            if (err.status === 422) {
              alert('Failed to add medical rep. Please check the input data.');
            } else {
              alert('An unexpected error occurred. Please try again.');
            }
          }
        });
      }
    }
  }

}
