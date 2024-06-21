import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(''),
  //   stock: new FormControl(0)
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  public isInValidField(field: string): boolean | null {
    return this.validationService.isInvalidField(this.myForm, field);
  }

  public getFieldError(fieldName: string): string | null {
    if (!this.myForm.contains(fieldName)) return null;

    const errors: ValidationErrors = this.myForm.controls[fieldName].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required': return 'Este dato es requerido';

        case 'minlength': return `Debe tener como mínimo ${errors['minlength'].requiredLength} caracteres. Actual: (${errors['minlength'].actualLength}).`;

        case 'min': return `Debe ser mayor o igual a ${errors['min'].min}. Actual: (${errors['min'].actual})`
      }
    }

    return null;
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      return this.myForm.markAllAsTouched();
    }

    console.log(this.myForm.value);
    this.myForm.reset({
      price: -2
    });
  }
}
