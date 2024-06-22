import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';
import { BackendService } from '../backend.service';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private service: BackendService) {}

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value

  //   return of({
  //     emilIsTaking: true
  //   })
  //     .pipe(
  //     delay(2500)
  //   );
  // }

  // validate(control: AbstractControl): Observable<ValidationErrors | null> {
  //   const email = control.value

  //   return new Observable<ValidationErrors | null>((subscriber) => {
  //     console.log({ email });
  //     if (email === 'eduar2083@gmail.com') {
  //       subscriber.next({
  //         emailIsTaken: 'El correo electronico ingresado ya existe'
  //       });
  //     }
  //     else {
  //       subscriber.next(null);
  //     }

  //     subscriber.complete();
  //   })
  //     .pipe(
  //     delay(2500)
  //   );
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value

    return this.service.checkEmail(email)
      .pipe(
        map(exists => {
          return !exists ? null : {
            emailIsTaken: 'Usuario ya existe en la Base de Datos'
          }
        })
      );
  }

}
