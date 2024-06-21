import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value

  //   return of({
  //     emilIsTaking: true
  //   })
  //     .pipe(
  //     delay(2500)
  //   );
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value

    return of({
      emailIsTaken: 'El correo electrónico ya existe'
    })
    .pipe(
      delay(2500)
    );
  }

}
