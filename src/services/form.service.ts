import { FormDialogComponent } from "@/app/form/form-dialog/form-dialog.component";
import { EARLIEST_POSSIBLE_DATE, EXPECTED_ARRIVAL_DATE, EXPECTED_DEPARTURE_DATE, LATEST_POSSIBLE_DATE, PROBLEMATIC_FOODS, TASK_HELP } from "@/definitions";
import { dbRef } from "@/firebase";
import { addDatesToAttendee, daysStaying, formModalData, isoDatesToAttendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { ExtractType, IAttendee, IValueLabel } from "@/types";
import { ArrayValidator, DateLimitValidator } from "@/validators";
import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { update } from "firebase/database";
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, Subject, Subscription, takeUntil, tap } from "rxjs";

@Injectable()
export class FormService {

  public form!: FormGroup<Record<keyof IAttendee<Date>, FormControl>>;
  private listener = new Subject();
  private valueChangesSubscription: Subscription | null = null;
  public timeStayingInWords$ = new BehaviorSubject<string>("");

  constructor(
    public auth: AuthService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  public initRegistrationForm(attendee: IAttendee<string> | null) {
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
      const parsedAttendee: IAttendee = addDatesToAttendee(attendee);
      this.createRegistrationForm(parsedAttendee);
    }

    this.listenForFormChanges();
  }

  private listenForFormChanges(): void {
    this.updateDurationOfStay();

    this.valueChangesSubscription = this.form.valueChanges
      .pipe(
        takeUntil(this.listener),
        tap(() => this.updateDurationOfStay()),
        filter(() => this.form.valid),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(4000),
        tap(() => this.saveUserRegistration()),
      ).subscribe();
  }

  public openAttendeeModalForm() {
    this.dialog.open(FormDialogComponent, formModalData(this.form))
      .afterClosed()
      .subscribe((isSaveAction: boolean) => {
        if (isSaveAction) {
          this.saveUserRegistration();
        } else {
          // it's a "close" action. ignore
        }
      });
  }

  public get userHasRegistered(): boolean {
    return !!this.form?.controls.addedOn.value;
  }

  public get userIsComing(): boolean {
    return !!this.form?.value.attending;
  }

  public get userHasBooked(): boolean {
    return !!this.form?.value.booked;
  }

  public foodDetail(value: string): IValueLabel {
    return PROBLEMATIC_FOODS.find(food => food.value === value) ?? ({} as IValueLabel);
  }

  public helpDetail(value: string): IValueLabel {
    return TASK_HELP.find(food => food.value === value) ?? ({} as IValueLabel);
  }

  public helpQuotas(value: string, numPeople: number, numPeopleWhoHelp: number): { val: string; color?: string; } {
    const help = this.helpDetail(value);
    if (!help.percent) {
      return { val: 'N/A' };
    }
    const required = Math.round(help.percent * numPeople);
    const signedUp = numPeopleWhoHelp;
    const displayVal = `${signedUp} of ${required}`;

    return { val: displayVal, color: signedUp >= required ? 'green' : 'orange' };
  }

  public createRegistrationForm(attendee: Partial<IAttendee<Date>>): void {
    const canChangeDates = (
      this.auth.isAdmin
        ? true
        : (
          new Date(attendee.arrival ?? 1e15) >= EARLIEST_POSSIBLE_DATE
          && new Date(attendee.departure ?? 0) <= LATEST_POSSIBLE_DATE
        )
    );
    this.form = new FormGroup({
      uid: new FormControl(attendee.uid ?? ""),
      name: new FormControl(attendee.name ?? "", { validators: Validators.required }),
      phone: new FormControl(attendee.phone ?? "", { validators: Validators.required }),
      email: new FormControl(attendee.email ?? "", { validators: Validators.required }),
      friendsWith: new FormControl(attendee.friendsWith ?? "", { validators: Validators.required }),

      booked: new FormControl(attendee.booked ?? true),
      attending: new FormControl(attendee.attending ?? true),
      arrival: new FormControl({
        value: attendee.arrival ?? EXPECTED_ARRIVAL_DATE,
        disabled: !canChangeDates,
      }, [Validators.required]),
      departure: new FormControl({
        value: attendee.departure ?? EXPECTED_DEPARTURE_DATE,
        disabled: !canChangeDates,
      }, [Validators.required]),
      comments: new FormControl(attendee.comments ?? ""),
      badDates: new FormControl(attendee.badDates ?? false),
      betterDates: new FormControl(attendee.betterDates ?? []),

      hasCar: new FormControl(attendee.hasCar ?? false),
      hasTent: new FormControl(attendee.hasTent ?? false),
      sleepsInTent: new FormControl(attendee.sleepsInTent ?? false),
      freeCarSeats: new FormControl(attendee.freeCarSeats ?? 0),

      problematicFoods: new FormControl(attendee.problematicFoods ?? []),
      taskHelp: new FormControl(attendee.taskHelp ?? [], ArrayValidator.minLength(1)),

      editedOn: new FormControl(new Date(attendee.editedOn ?? new Date())),
      addedOn: new FormControl(attendee.addedOn),
      iWillBringNoDeadAnimals: new FormControl(attendee.iWillBringNoDeadAnimals ?? false, Validators.requiredTrue),
    }, { validators: [DateLimitValidator.createValidator(this.auth.isAdmin)] });
  }

  public async saveUserRegistration(): Promise<void> {

    const snackBarInstance = this.snackBar.open("saving...", undefined, { duration: 2000 });

    // Update added/edited datetime stamps
    if (!this.form.controls.addedOn.getRawValue()) {
      this.form.controls.addedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });
    }
    this.form.controls.editedOn.setValue(new Date(), { emitEvent: false, onlySelf: true });


    const value: IAttendee<Date> = this.form.getRawValue();
    const valueParsed: IAttendee<string> = isoDatesToAttendee(value);

    await update(dbRef(`/people/${value.uid}`), valueParsed);
    setTimeout(() => {
      snackBarInstance.dismiss();
    }, 700);
  }

  public toggleCheckbox(
    key: ExtractType<IAttendee, boolean>,
    value: boolean,
    emit: boolean = true,
  ): void {
    this.form.controls[key].setValue(
      value,
      emit ? undefined : { emitEvent: false, onlySelf: true },
    );
  }

  private updateDurationOfStay(): void {
    this.timeStayingInWords$.next(daysStaying(this.form.getRawValue() as IAttendee));
  }
}
