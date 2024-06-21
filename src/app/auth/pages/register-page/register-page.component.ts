import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(ValidationService.firstNameAndLastNamePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidationService.emailPattern)]],
    username: ['', [Validators.required, this.validationService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  public onSubmit(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
  }

  public isInValidField(field: string) {
    return this.validationService.isInvalidField(this.myForm, field);
  }
}
