import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VisitService } from '../services/visit.service';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@Component({
  selector: 'app-visit-dialog',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    CommonModule,
    MatFormField,
    MatDialogModule,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    MatSelect,
    MatOption,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatFormFieldModule

  ],
  templateUrl: './add-visit-dialog.component.html',
  styleUrls: ['./add-visit-dialog.component.css'] // Corrected styleUrls
})



// work

// export class AddVisitDialogComponent implements OnInit {

//   visitForm: FormGroup;
//   doctors: any[] = [];
//   users: any[] = [];
//   tools: any[] = [];
//   statusOptions: string[] = ['ongoing', 'closed', 'done'];

//   constructor(
//     private fb: FormBuilder,
//     private visitService: VisitService,
//     public dialogRef: MatDialogRef<AddVisitDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.visitForm = this.fb.group({
//       visit_date: [data.visit_date || '', Validators.required],
//       visit_time: [data.visit_time || '', Validators.required],
//       purpose: ['', Validators.required],
//       status: ['ongoing', Validators.required],
//       doctor_id: ['', Validators.required],
//       user_id: ['', Validators.required],
//       tools: [[]],  // Initialize as FormArray
//     });

//     if (data.tools) {
//       this.setTools(data.tools);  // Set tools if data already exists
//     }
//   }

//   ngOnInit(): void {

    
//     this.visitService.getTools().subscribe(tools => {
//       this.tools = tools;
//     });

//     this.visitService.getDoctors().subscribe(doctors => {
//       this.doctors = doctors;
//     });

//     this.visitService.getUsers().subscribe(users => {
//       this.users = users;
//     });
//   }


//   private _filterDoctors(value: string): any[] {
//     const filterValue = value.toLowerCase();
//     return this.doctors.filter(doctor => doctor.first_name.toLowerCase().includes(filterValue));
//   }

//   displayDoctorFn(doctor?: any): string {
//     return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
//   }

//   setTools(toolIds: number[]): void {
//     const toolsFormArray = this.visitForm.get('tools') as FormArray;
//     toolIds.forEach(toolId => {
//       toolsFormArray.push(this.fb.control(toolId));
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     if (this.visitForm.valid) {
//       const formData = { ...this.visitForm.value };

//       // Optionally, ensure the 'tools' field is an array of selected tool IDs
//       formData.tools = formData.tools.map((toolId: number) => toolId);

//       // Proceed with saving
//       this.visitService.createVisit(formData).subscribe({
//         next: (response) => {
//           console.log('Visit saved successfully:', response);
//           this.dialogRef.close(response);
//         },
//         error: (error) => {
//           console.error('Error saving visit:', error);
//           alert('An error occurred while saving the visit.');
//         }
//       });
//     } else {
//       console.log('Form is invalid');
//       // Optionally, log specific errors or form control states
//       Object.keys(this.visitForm.controls).forEach(field => {
//         const control = this.visitForm.get(field);
//         console.log(field, control!.errors);
//       });
//       return;
//     }
//   }
// }










export class AddVisitDialogComponent implements OnInit {
  visitForm: FormGroup;
  doctors: any[] = [];
  users: any[] = [];
  tools: any[] = [];
  statusOptions: string[] = ['ongoing', 'closed', 'done'];
  filteredDoctors$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private visitService: VisitService,
    public dialogRef: MatDialogRef<AddVisitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.visitForm = this.fb.group({
      visit_date: [data?.visit_date || '', Validators.required],
      visit_time: [data?.visit_time || '', Validators.required],
      purpose: ['', Validators.required],
      status: ['ongoing', Validators.required],
      doctorCtrl: ['', Validators.required], // Add doctorCtrl here
      user_id: ['', Validators.required],
      tools: [[]],  // Initialize as an array
    });

    if (data.tools) {
      this.setTools(data.tools);  // Set tools if data already exists
    }
  }

  ngOnInit(): void {
    this.filteredDoctors$ = this.visitForm.get('doctorCtrl')!.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.first_name),
      map(name => name ? this._filterDoctors(name) : this.doctors.slice())
    );

    this.visitService.getTools().subscribe(tools => {
      this.tools = tools;
    });

    this.visitService.getDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });

    this.visitService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  private _filterDoctors(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.doctors.filter(doctor => doctor.first_name.toLowerCase().includes(filterValue));
  }

  displayDoctorFn(doctor?: any): string {
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : '';
  }

    setTools(toolIds: number[]): void {
    const toolsFormArray = this.visitForm.get('tools') as FormArray;
    toolIds.forEach(toolId => {
      toolsFormArray.push(this.fb.control(toolId));
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.visitForm.valid) {
      const formData = { ...this.visitForm.value };
      formData.doctor_id = formData.doctorCtrl.id; // Assign doctor_id from doctorCtrl
      delete formData.doctorCtrl; // Remove doctorCtrl to avoid confusion

      formData.tools = formData.tools.map((toolId: number) => toolId);

      this.visitService.createVisit(formData).subscribe({
        next: (response) => {
          console.log('Visit saved successfully:', response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error saving visit:', error);
          alert('An error occurred while saving the visit.');
        }
      });
    } else {
      console.log('Form is invalid');
      Object.keys(this.visitForm.controls).forEach(field => {
        const control = this.visitForm.get(field);
        console.log(field, control!.errors);
      });
      return;
    }
  }
}
