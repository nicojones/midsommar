import { AuthService } from "@/services/auth.service";
import { ExtractType, IAttendee, PDefault } from "@/types";
import { IDateLimitError } from "@/validators";
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MaterialModule } from "@/app/material.module";
import { CommonModule } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EARLIEST_POSSIBLE_DATE, LATEST_POSSIBLE_DATE, MIDSOMMAR_DATE } from "@/definitions";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { AttendingButtonComponent } from "@/app/form/attending-button/attending-button.component";
import { timeStayingInWords } from "@/functions";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MaterialModule, ReactiveFormsModule, CommonModule, AttendingButtonComponent],
})
export class FormDialogComponent {

  @Output() public submit = new EventEmitter();

  public debug: boolean = false;
  public readonly noopComponent = NoopComponent;

  public minAllowedDate = EARLIEST_POSSIBLE_DATE;
  public maxAllowedDate = LATEST_POSSIBLE_DATE;
  public midsommarDate = MIDSOMMAR_DATE;


  public constructor(
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public userRegistrationForm: FormGroup<Record<keyof IAttendee, FormControl>>,
    public snackBar: MatSnackBar,
  ) {

  }

  public get isEdit(): boolean {
    return this.userRegistrationForm.value.addedOn;
  }

  public get timeStayingInWords(): string {
    return timeStayingInWords(this.userRegistrationForm.value as IAttendee);
  }

  public submitFunction(e: PDefault): void {
    e.preventDefault();
    e.stopPropagation();
    this.userRegistrationForm.markAllAsTouched();
    if (this.userRegistrationForm.valid) {
      this.submit.emit();
    } else {
      const _snackBarInstance = this.snackBar.open("please fix the errors");
    }
  }

  public toggleCheckbox(key: ExtractType<IAttendee, boolean>, value: boolean): void {
    this.userRegistrationForm.controls[key].setValue(value);
  }

  public hasError(key: keyof Pick<IAttendee, "arrival" | "departure">, error: IDateLimitError): boolean {
    return this.userRegistrationForm.get(key)?.errors?.[error] ?? false;
  }

  public dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      // Highlight the 1st and 20th day of each month.
      return cellDate.getDate() === MIDSOMMAR_DATE.getDate() ? 'highlighted-date' : '';
    }

    return '';
  };
}


@Component({
  selector: 'app-noop',
  template: "<br/>",
  standalone: true,
  imports: [],
})
export class NoopComponent {}