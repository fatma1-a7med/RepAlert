import { AbstractControl, ValidatorFn,Validators } from '@angular/forms';

// Validator to allow only letters
export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^[a-zA-Z]+$/.test(control.value);
    return valid ? null : { onlyLetters: true };
  };
}


// Validator to allow only alphanumeric characters
export function alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[a-zA-Z0-9]+$/.test(control.value);
      return valid ? null : { alphanumeric: true };
    };
  }


  // Validator to validate email format
export function emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Validators.required(control)) {
        return null; // If the control is empty, let the required validator handle it
      }
  
      const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(control.value);
      return valid ? null : { emailFormat: true };
    };
  }

  // Numeric validator function
export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (Validators.required(control)) {
      return null; // If the control is empty, let the required validator handle it
    }

    const valid = /^\d+$/.test(control.value); // Check if value contains only digits
    return valid ? null : { numeric: true };
  };
}