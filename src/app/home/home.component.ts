import { FormDialogComponent } from "@/app/form/form-dialog/form-dialog.component";
import { EXPECTED_ARRIVAL_DATE, EXPECTED_DEPARTURE_DATE } from "@/definitions";
import { dbRef } from "@/firebase";
import { addDatesToAtendee, formModalData, isoDatesToAtendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { StoreService } from "@/services/store.service";
import { ExtractType, IAtendee } from "@/types";
import { DateLimitValidator } from "@/validators";
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { get, query, update } from "firebase/database";
import { Subject, Subscription, debounceTime, distinctUntilChanged, filter, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {

  // TODO Céline -- move to RegistrationService
  public userRegistrationForm!: FormGroup<Record<keyof IAtendee<Date>, FormControl>>;
  // TODO Céline -- move to RegistrationService
  private formListener$ = new Subject();
  // TODO Céline -- move to RegistrationService
  private valueChangesSubscription: Subscription | null = null;

  public constructor(
    public auth: AuthService,
    public ss: StoreService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {

    get(query(dbRef(`/people/${auth.user.uid}`)))
      .then(r => r.val())
      .then((atendee: IAtendee<string> | null) => {

        // TODO Céline -- move all this code to a function `RegistrationService::initRegistrationForm(atendee)` that handles everything
        this.valueChangesSubscription?.unsubscribe();

        if (!atendee) {
          this.createRegistrationForm({
            email: auth.identifier,
            name: auth.user.displayName ?? "",
          });
          // It's a registration
          this.openAtendeeModalForm();
        } else {
          const parsedAtendee: IAtendee<Date> = addDatesToAtendee(atendee);
          this.createRegistrationForm(parsedAtendee);
        }

        this.listenForFormChanges();
      });
  }

  public ngOnDestroy(): void {
    this.formListener$.complete();
  }

  // TODO Céline -- move to RegistrationService
  private listenForFormChanges(): void {
    this.valueChangesSubscription = this.userRegistrationForm.valueChanges
      .pipe(
        takeUntil(this.formListener$),
        filter(() => this.userRegistrationForm.valid),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(2000),
        tap(() => this.saveUserRegistration()),
      ).subscribe();
  }

  // TODO Céline -- move to RegistrationService
  public openAtendeeModalForm() {
    this.dialog.open(FormDialogComponent, formModalData(this.userRegistrationForm));
  }

  // TODO Céline -- move to RegistrationService
  public get userHasRegistered(): boolean {
    return !!this.userRegistrationForm.controls.addedOn.value;
  }

  // TODO Céline -- move to RegistrationService
  public get userIsComing(): boolean {
    return this.userRegistrationForm.value.attending;
  }

  // TODO Céline -- move to RegistrationService
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

  // TODO Céline -- move to RegistrationService
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

  // TODO Céline -- move to RegistrationService
  public toggleCheckbox(key: ExtractType<IAtendee, boolean>, value: boolean): void {
    this.userRegistrationForm.controls[key].setValue(value);
  }
}
