import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExtractType, IAttendee} from "@/types";
import {debounceTime, distinctUntilChanged, filter, Subject, Subscription, takeUntil, tap} from "rxjs";
import {addDatesToAtendee, formModalData, isoDatesToAtendee} from "@/functions";
import {AuthService} from "@/services/auth.service";
import {FormDialogComponent} from "@/app/form/form-dialog/form-dialog.component";
import {EXPECTED_ARRIVAL_DATE, EXPECTED_DEPARTURE_DATE} from "@/definitions";
import {DateLimitValidator} from "@/validators";
import {update} from "firebase/database";
import {dbRef} from "@/firebase";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class RegistrationService{

  public userRegistrationForm!: FormGroup<Record<keyof IAttendee<Date>, FormControl>>;
  private formListener$ = new Subject();
  private valueChangesSubscription: Subscription | null = null;

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  public initRegistrationForm(attendee: IAttendee<string> | null){
    this.valueChangesSubscription?.unsubscribe();

    if (!attendee) {
      this.createRegistrationForm({
        email: this.auth.identifier,
        name: this.auth.user.displayName ?? "",
        uid: this.auth.userId,
      });
      // It's a registration
      this.openAttendeeModalForm();
    } else {
      const parsedAttendee: IAttendee = addDatesToAtendee(attendee);
      this.createRegistrationForm(parsedAttendee);
    }

    this.listenForFormChanges();
  }

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

  public openAttendeeModalForm() {
    this.dialog.open(FormDialogComponent, formModalData(this.userRegistrationForm));
  }

  public get userHasRegistered(): boolean {
    return !!this.userRegistrationForm.controls.addedOn.value;
  }

  public get userIsComing(): boolean {
    return this.userRegistrationForm.value.attending;
  }

  public createRegistrationForm(attendee: Partial<IAttendee<Date>>): void {
    this.userRegistrationForm = new FormGroup({
      uid: new FormControl(attendee.uid ?? ""),
      name: new FormControl(attendee.name ?? "", { validators: Validators.required }),
      arrival: new FormControl(attendee.arrival ?? EXPECTED_ARRIVAL_DATE, [Validators.required]),
      departure: new FormControl(attendee.departure ?? EXPECTED_DEPARTURE_DATE, [Validators.required]),
      hasCar: new FormControl(attendee.hasCar ?? false),
      hasTent: new FormControl(attendee.hasTent ?? false),
      sleepsInTent: new FormControl(attendee.sleepsInTent ?? false),
      attending: new FormControl(attendee.attending ?? true),
      email: new FormControl(attendee.email ?? "", Validators.required),
      freeCarSeats: new FormControl(attendee.freeCarSeats ?? 0),
      editedOn: new FormControl(new Date(attendee.editedOn ?? new Date())),
      addedOn: new FormControl(attendee.addedOn),
      comments: new FormControl(attendee.comments ?? ""),
      iWillBringNoDeadAnimals: new FormControl(attendee.iWillBringNoDeadAnimals ?? false, Validators.requiredTrue),
    }, { validators: [DateLimitValidator.createValidator()] });
  }

  public async saveUserRegistration(): Promise<void> {

    const snackBarInstance = this.snackBar.open("saving...", undefined, { duration: 2000 });

    // Update added/edited datetime stamps
    if (!this.userRegistrationForm.controls.addedOn.value) {
      this.userRegistrationForm.controls.addedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });
    }
    this.userRegistrationForm.controls.editedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });


    const value: IAttendee<Date> = this.userRegistrationForm.getRawValue();
    const valueParsed: IAttendee<string> = isoDatesToAtendee(value);

    await update(dbRef(`/people/${this.auth.user.uid}`), valueParsed);
    setTimeout(() => {
      snackBarInstance.dismiss();
    }, 700);
  }

  public toggleCheckbox(key: ExtractType<IAttendee, boolean>, value: boolean): void {
    this.userRegistrationForm.controls[key].setValue(value);
  }
}
