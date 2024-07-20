import {dbRef} from "@/firebase";
import {AuthService} from "@/services/auth.service";
import {StoreService} from "@/services/store.service";
import {IAttendee} from "@/types";
import {Component} from '@angular/core';
import {get, query} from "firebase/database";
import {RegistrationService} from "@/services/registration.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {


  public constructor(
    public auth: AuthService,
    public ss: StoreService,
    public rs: RegistrationService,
  ) {

    get(query(dbRef(`/people/${auth.user.uid}`)))
      .then(r => r.val())
      .then((attendee: IAttendee<string> | null) => {
        this.rs.initRegistrationForm(attendee);
      });
  }

  //public ngOnDestroy(): void {
    //this.formListener$.complete();
  //}

}
