import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public static firstNameAndLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        userIsTaken: true
      }
    }

    return null;
  }

  public isInvalidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string): string | null {
    if (!form.contains(field)) return null;

    const errors: ValidationErrors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Este dato es requerido';

        case 'minlength': return `Debe tener como mínimo ${errors['minlength'].requiredLength} caracteres. Actual: (${errors['minlength'].actualLength}).`;

        case 'min': return `Debe ser mayor o igual a ${errors['min'].min}. Actual: (${errors['min'].actual})`
      }
    }

    return null;
  }

}
