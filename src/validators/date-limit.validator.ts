import { EARLIEST_POSSIBLE_DATE, LATEST_POSSIBLE_DATE } from "@/definitions";
import { IAtendee } from "@/types";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";

export type IDateLimitError = "arrivalTooEarly" | "departureTooLate" | "collision";

export class DateLimitValidator {
  public static createValidator(): ValidatorFn {
    // @ts-expect-error mismatching types
    return (control: FormGroup<Record<keyof IAtendee<Date>, FormControl>>): any => {
      const collision = control.controls.departure.value <= control.controls.arrival.value;
      const arrivalTooEarly = control.controls.arrival.value <= EARLIEST_POSSIBLE_DATE;
      const departureTooLate = control.controls.departure.value >= LATEST_POSSIBLE_DATE;

      if (arrivalTooEarly || departureTooLate || collision) {
        if (arrivalTooEarly || collision) {
          control.controls.arrival.markAsTouched();
          control.controls.arrival.setErrors({
            arrivalTooEarly,
            collision,
          });
        }
        if (departureTooLate || collision) {
          control.controls.departure.markAsTouched();
          control.controls.departure.setErrors({
            departureTooLate,
            collision,
          });
        }
        return { errors: true };
      } else {
        control.controls.arrival.setErrors(null);
        control.controls.departure.setErrors(null);
        return null;
      }
    };
  }
}
