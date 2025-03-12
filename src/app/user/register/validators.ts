import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { Auth, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { AsyncValidator } from '@angular/forms';

export function Match(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchingControl = group.get(matchingControlName);
    if (!control || !matchingControl) {
      console.error('Form controls can not be found in the FormGroup.');
      return { controlNotFound: false };
    }
    const error =
      control.value === matchingControl.value
        ? null
        : {
            noMatch: true,
          };
    matchingControl.setErrors(error);
    return error;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EmailTaken implements AsyncValidator {
  auth = inject(Auth);

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return fetchSignInMethodsForEmail(this.auth, control.value).then(
        (response) => (response.length ? { emailTaken: true } : null)
    );
  }
}
