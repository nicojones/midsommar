import { EXPECTED_ARRIVAL_DATE, EXPECTED_DEPARTURE_DATE } from "@/definitions";
import { dbRef } from "@/firebase";
import { addDatesToAtendee, isoDatesToAtendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { StoreService } from "@/services/store.service";
import { ExtractType, IAtendee } from "@/types";
import { DateLimitValidator } from "@/validators";
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, query, update } from "firebase/database";
import { Subject, Subscription, debounceTime, distinctUntilChanged, filter, takeUntil, tap } from "rxjs";
import {
  MatDialog,
} from '@angular/material/dialog';
import { FormDialogComponent } from "@/app/form/form-dialog/form-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {

  public userRegistrationForm!: FormGroup<Record<keyof IAtendee<Date>, FormControl>>;
  private formListener$ = new Subject();
  private valueChangesSubscription: Subscription | null = null;

  public constructor(
    public auth: AuthService,
    public ss: StoreService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {

    this.createRegistrationForm({});
    get(query(dbRef(`/people/${auth.user.uid}`)))
      .then(r => r.val())
      .then((atendee: IAtendee<string> | null) => {
        this.valueChangesSubscription?.unsubscribe();

        if (!atendee) {
          // It's a registration
          this.userRegistrationForm.patchValue({
            email: auth.identifier,
            name: auth.user.displayName ?? "",
          });
          this.openAtendeeForm();
        } else {
          const parsedAtendee: IAtendee<Date> = addDatesToAtendee(atendee);
          this.userRegistrationForm.setValue(parsedAtendee);
        }

        this.listenForFormChanges();
      });
  }

  public ngOnDestroy(): void {
    this.formListener$.complete();
  }

  private listenForFormChanges(): void {
    this.valueChangesSubscription = this.userRegistrationForm.valueChanges
      .pipe(
        takeUntil(this.formListener$),
        filter(() => this.userRegistrationForm.valid),
        distinctUntilChanged(),
        debounceTime(2000),
        tap(() => this.saveUserRegistration()),
      ).subscribe();
  }

  public openAtendeeForm() {
    this.dialog.open(FormDialogComponent, {
      data: this.userRegistrationForm,
    });
  }

  public get userHasRegistered(): boolean {
    return !!this.userRegistrationForm.controls.addedOn.value;
  }

  public get userIsComing(): boolean {
    return this.userRegistrationForm.value.attending;
  }

  public createRegistrationForm(atendee: Partial<IAtendee<Date>>): void {
    this.userRegistrationForm = new FormGroup({
      name: new FormControl(atendee.name ?? "", { validators: Validators.required }),
      arrival: new FormControl(atendee.arrival ?? EXPECTED_ARRIVAL_DATE, [Validators.required]),
      departure: new FormControl(atendee.departure ?? EXPECTED_DEPARTURE_DATE, [Validators.required]),
      hasCar: new FormControl(atendee.hasCar ?? false),
      hasTent: new FormControl(atendee.hasTent ?? false),
      sleepsInTent: new FormControl(atendee.sleepsInTent ?? false),
      attending: new FormControl(atendee.attending ?? true),
      email: new FormControl(atendee.email ?? "", Validators.required),
      freeCarSeats: new FormControl(atendee.freeCarSeats ?? 0),
      editedOn: new FormControl(new Date(atendee.editedOn ?? new Date())),
      addedOn: new FormControl(atendee.addedOn),
      comments: new FormControl(atendee.comments ?? ""),
      iWillBringNoDeadAnimals: new FormControl(atendee.iWillBringNoDeadAnimals ?? false, Validators.requiredTrue),
    }, { validators: [DateLimitValidator.createValidator()] });
  }

  public async saveUserRegistration(): Promise<void> {

    const snackBarInstance = this.snackBar.open("saving...", undefined, { duration: 2000 });

    // Update added/edited datetime stamps
    if (!this.userRegistrationForm.controls.addedOn.value) {
      this.userRegistrationForm.controls.addedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });
    }
    this.userRegistrationForm.controls.editedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });


    const value: IAtendee<Date> = this.userRegistrationForm.getRawValue();
    const valueParsed: IAtendee<string> = isoDatesToAtendee(value);

    await update(dbRef(`/people/${this.auth.user.uid}`), valueParsed);
    setTimeout(() => {
      snackBarInstance.dismiss();
    }, 700);
  }

  public toggleCheckbox(key: ExtractType<IAtendee, boolean>, value: boolean): void {
    this.userRegistrationForm.controls[key].setValue(value);
  }
}
