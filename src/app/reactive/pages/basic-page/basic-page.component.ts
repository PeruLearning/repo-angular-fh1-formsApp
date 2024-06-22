import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {
    // Utilizando directamente FormGroup
    // this.myForm = new FormGroup({
    //   name: new FormControl(''),
    //   price: new FormControl(''),
    //   stock: new FormControl(0)
    // });

    // Utilizando FormBuilder
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  public isInValidField(field: string): boolean | null {
    return this.validationService.isInvalidField(this.myForm, field);
  }

  public getFieldError(field: string): string | null {
    return this.validationService.getFieldError(this.myForm, field);
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
