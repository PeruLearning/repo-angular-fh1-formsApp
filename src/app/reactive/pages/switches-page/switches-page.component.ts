import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent implements OnInit {

  public person = {
    gender: 'F',
    wantNotifications: false
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  public ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public isInValidField(field: string): boolean | null {
    return this.validationService.isInvalidField(this.myForm, field);
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      return this.myForm.markAllAsTouched();
    }

    this.person = this.myForm.value;

    console.log(this.myForm.value);
    console.log(this.person);
  }

}
