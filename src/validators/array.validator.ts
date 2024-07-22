import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ArrayValidator {

  public static minLength<T extends Array<unknown> = any[]>(
    minLength: number = 1,
  ): ValidatorFn {
    return (control: AbstractControl<T>) => {
      if (!control.value || !control.value.length || control.value.length < minLength) {
        return { minLength: true };
      }
      return null;
    };
  }
}
