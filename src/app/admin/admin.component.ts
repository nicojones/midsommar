import { dbRef } from "@/firebase";
import {addDatesToAtendee, isoDatesToAtendee} from "@/functions";
import { AuthService } from "@/services/auth.service";
import { IAttendee } from "@/types";
import { Component } from '@angular/core';
import {get, onValue, query} from "firebase/database";
import {RegistrationService} from "@/services/registration.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  public users: IAttendee[] = [];
  public usersNotComing: IAttendee[] = [];

  public constructor(
    private auth: AuthService,
    public rs: RegistrationService,
  ) {

    onValue(query(dbRef(`/people`)), r => {
      const attendees: Record<string, IAttendee<string>> | null = r.val();
        if (!attendees) {
          console.log("NO atendees");
          return; // database empty, most likely
        }
        const allUsers = Object.values(attendees).map(addDatesToAtendee);
        this.users = allUsers.filter(u => u.attending);
        this.usersNotComing = allUsers.filter(u => !u.attending);
    });
  }

  public editAttendee(attendee: IAttendee){
    this.rs.initRegistrationForm(isoDatesToAtendee(attendee));
    this.rs.openAttendeeModalForm();
  }

}
