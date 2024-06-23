import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  public error: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private Jarwis: JarwisService,
    private Token: TokenService,
    private Auth: AuthService
  ) {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone_number: new FormControl("", [Validators.required, Validators.pattern(/^\d{11}$/)]),
      state: new FormControl("", [Validators.required, Validators.minLength(4)]),
      territory: new FormControl("", [Validators.required, Validators.minLength(4)]),
      city: new FormControl("", [Validators.required, Validators.minLength(4)]),
      street: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", [Validators.required, Validators.minLength(9)]),
      image: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userForm.valid) {
      const formData = new FormData();
      Object.keys(this.userForm.controls).forEach(key => {
        formData.append(key, this.userForm.get(key)?.value);
      });

      this.Jarwis.signup(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    } else {
      this.validateAllFormFields(this.userForm);
    }
  }

  handleResponse(data: any) {
    console.log('API Response:', data);
    console.log('Token:', data.remember_token);
    this.Token.handle(data.remember_token);
    this.router.navigateByUrl('/admin/login');
  }

  handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    this.error = error.error.errors;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        image: file
      });
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
