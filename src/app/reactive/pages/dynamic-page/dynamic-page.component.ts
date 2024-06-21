import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ValidationService } from '../../../shared/services/validation.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   favoriteGames: new FormArray([
  //     new FormControl('Metal Gear', Validators.required),
  //     new FormControl('Death Strading', Validators.required)
  //   ])
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  public onAddToFavorites(): void {
    if (this.newFavorite.invalid) {
      return this.newFavorite.markAsTouched();
    }

    const newGame = this.newFavorite.value;
    // this.favoriteGameControls.push(new FormControl(newGame, Validators.required));
    this.favoriteGameControls.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();
  }

  public onDeleteFavorite(index: number): void {
    this.favoriteGameControls.removeAt(index);
  }

  public onSubmit(): void {
    if (this.myForm.invalid) {
      return this.myForm.markAllAsTouched();
    }

    console.log(this.myForm.value);
    // (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.controls['favoriteGames'] = new FormArray([]);
    this.myForm.reset();
  }

  public isInValidField(field: string): boolean | null {
    return this.validationService.isInvalidField(this.myForm, field);
  }

  public isInvalidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

  public getFieldError(field: string): string | null {
    return this.validationService.getFieldError(this.myForm, field);
  }

  public get favoriteGameControls() : FormArray {
    return this.myForm.get('favoriteGames') as FormArray
  }
}
