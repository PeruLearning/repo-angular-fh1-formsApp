import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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

  public isInValidField(fieldName: string): boolean | null {
    return this.myForm.controls[fieldName].errors
      && this.myForm.controls[fieldName].touched;
  }

  public isInvalidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  public get favoriteGameControls() : FormArray {
    return this.myForm.get('favoriteGames') as FormArray
  }
}
