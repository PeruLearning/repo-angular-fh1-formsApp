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

    const controlErrors: ValidationErrors = form.controls[field].errors || {};
    if (!controlErrors) return null;

    const errorMessages = {
      required: 'Este dato es requerido',
      minlength: (errors: any) => `Debe tener como mínimo ${errors.requiredLength} caracteres. Actual: (${errors.actualLength}).`,
      maxlength: (errors: any) => `Debe tener como máximo ${errors.requiredLength} caracteres. Actual: (${errors.actualLength}).`,
      min: (errors: any) => `Debe ser mayor o igual a ${errors.min}. Actual: (${errors.actual}).`,
      max: (errors: any) => `Debe ser menor o igual a ${errors.max}. Actual: (${errors.actual}).`,
      pattern: 'El formato es incorrecto',
      email: 'El correo electrónico no es válido',
      emailIsTaken: (errors: any) => errors,
    };

    for (const [errorKey, errorMessage] of Object.entries(errorMessages)) {
      if (controlErrors[errorKey]) {
        return typeof errorMessage === 'function'
          ? errorMessage(controlErrors[errorKey])
          : errorMessage;
      }
    }

    return null;
  }

}
