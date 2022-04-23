import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const hasUppercase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[d+]/.test(value);
    const passwordValid = hasUppercase && hasLowerCase && hasNumeric;

    return !passwordValid
      ? { passwordStrength: true }
      : null;
  }
}
