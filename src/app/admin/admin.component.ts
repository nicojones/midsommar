import { dbRef } from "@/firebase";
import { addDatesToAtendee, isoDatesToAtendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { IAttendee } from "@/types";
import { Component } from '@angular/core';
import { onValue, query } from "firebase/database";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  public users: IAttendee[] = [];
  public usersNotComing: IAttendee[] = [];

  public constructor(
    private auth: AuthService,
    public fs: FormService,
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
    this.fs.initRegistrationForm(isoDatesToAtendee(attendee));
    this.fs.openAttendeeModalForm();
  }

}
