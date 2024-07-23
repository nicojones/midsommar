import { dbRef } from "@/firebase";
import { comingOrInterested } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { StoreService } from "@/services/store.service";
import { IAttendee } from "@/types";
import { Component } from '@angular/core';
import { get, query } from "firebase/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public readonly comingOrInterested = comingOrInterested;

  public constructor(
    public auth: AuthService,
    public ss: StoreService,
    public fs: FormService,
  ) {

    get(query(dbRef(`/people/${auth.user.uid}`)))
      .then(r => r.val())
      .then((attendee: IAttendee<string> | null) => {
        this.fs.initRegistrationForm(attendee);
      });
  }

  public changeAttendance(newValue: boolean) {
    this.fs.toggleCheckbox('attending', newValue, true);
    // Allow changes to propagate through the form
    setTimeout(() => {
      this.fs.saveUserRegistration();
    }, 50);

  }

  //public ngOnDestroy(): void {
    //this.formListener$.complete();
  //}

}
