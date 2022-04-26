import {FormGroup, Validators, ValidatorFn} from "@angular/forms";

export function createPromRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const start: Date = form.get('promoStartAt').value;
    const end: Date = form.get('promEndAt').value;

    if(end && start) {
      const isRangeValid = (end.getTime() - start.getTime() > 0);

      return  isRangeValid ? null : { promoPeriod: true };
    }

    return null;

  }
}
