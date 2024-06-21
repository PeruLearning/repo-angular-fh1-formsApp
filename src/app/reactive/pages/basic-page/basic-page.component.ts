import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(
    private fb: FormBuilder
  ) { }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  public onSave(): void {
    if (this.myForm.invalid) return;

    console.log(this.myForm.value);
    this.myForm.reset({
      price: -2
    });
  }
}
