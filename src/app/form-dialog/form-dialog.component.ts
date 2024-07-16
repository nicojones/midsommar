import { AuthService } from "@/services/auth.service";
import { ExtractType, IAtendee, PDefault } from "@/types";
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

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MaterialModule, ReactiveFormsModule, CommonModule],
})
export class FormDialogComponent {

  @Output() public submit = new EventEmitter();

  public debug: boolean = false;


  public constructor(
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public userRegistrationForm: FormGroup<Record<keyof IAtendee, FormControl>>,
    public snackBar: MatSnackBar,
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
      this.submit.emit();
    } else {
      const _snackBarInstance = this.snackBar.open("please fix the errors");
    }
  }

  public toggleCheckbox(key: ExtractType<IAtendee, boolean>, value: boolean): void {
    this.userRegistrationForm.controls[key].setValue(value);
  }

  public hasError (key: keyof Pick<IAtendee, "arrival" | "departure">, error: IDateLimitError): boolean {
    return this.userRegistrationForm.get(key)?.errors?.[error] ?? false;
  }
}
