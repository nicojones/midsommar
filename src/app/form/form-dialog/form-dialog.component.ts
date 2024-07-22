import { AttendingButtonComponent } from "@/app/form/attending-button/attending-button.component";
import { MaterialModule } from "@/app/material.module";
import { EARLIEST_POSSIBLE_DATE, LATEST_POSSIBLE_DATE, MIDSOMMAR_DATE, PROBLEMATIC_FOODS, TASK_HELP } from "@/definitions";
import { FormService } from "@/services/form.service";
import { IAttendee, PDefault } from "@/types";
import { IDateLimitError } from "@/validators";
import { CommonModule } from "@angular/common";
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FakeHintComponent } from "@/app/form/fake-hint/fake-hint.component";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatDialogContent, MaterialModule, ReactiveFormsModule, CommonModule, AttendingButtonComponent, FakeHintComponent],
})
export class FormDialogComponent {

  public debug: boolean = false;
  public readonly noopComponent = NoopComponent;

  public readonly minAllowedDate = EARLIEST_POSSIBLE_DATE;
  public readonly maxAllowedDate = LATEST_POSSIBLE_DATE;
  public readonly midsommarDate = MIDSOMMAR_DATE;
  public readonly problematicFoods = PROBLEMATIC_FOODS;
  public readonly taskHelp = TASK_HELP;


  public constructor(
    @Inject(MAT_DIALOG_DATA) public userRegistrationForm: FormGroup<Record<keyof IAttendee, FormControl>>,
    public snackBar: MatSnackBar,
    public fs: FormService,
    private dialogRef: MatDialogRef<any, boolean>,
  ) {

  }

  public get isEdit(): boolean {
    return this.userRegistrationForm.value.addedOn;
  }

  public submitFunction(e: PDefault): void {
    e.preventDefault();
    e.stopPropagation();
    this.userRegistrationForm.markAllAsTouched();
    if (this.userRegistrationForm.valid) {
      this.dialogRef.close(true);
    } else {
      const _snackBarInstance = this.snackBar.open("please fix the errors");
    }
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

  public closeDialog(): void {
    this.dialogRef.close(false);
  }
}


@Component({
  selector: 'app-noop',
  template: "<br/>",
  standalone: true,
  imports: [],
})
export class NoopComponent { }
