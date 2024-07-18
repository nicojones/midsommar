import { dbRef } from "@/firebase";
import { addDatesToAtendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { IAtendee } from "@/types";
import { Component } from '@angular/core';
import { get, query } from "firebase/database";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {

  public users: IAtendee[] = [];
  public usersNotComing: IAtendee[] = [];

  public constructor(
    private auth: AuthService,
  ) {

    get(query(dbRef(`/people`)))
      .then(r => r.val())
      .then((atendees: Record<string, IAtendee<string>> | null) => {
        if (!atendees) {
          console.log("NO atendees");
          return; // database empty, most likely
        }

        const allUsers = Object.values(atendees).map(addDatesToAtendee);
        this.users = allUsers.filter(u => u.attending);
        this.usersNotComing = allUsers.filter(u => !u.attending);
      });
  }
}
