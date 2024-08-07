import { dbRef } from "@/firebase";
import { toIsoDate, addDatesToAttendee, addDatesToStats, daysStaying, isoDatesToAttendee } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { IAttendee, IDailyStats, IStats, IStatsPerDay } from "@/types";
import { Component } from '@angular/core';
import { onValue, query } from "firebase/database";

@Component({
  selector: 'app-admin-guests',
  templateUrl: './admin-guests.component.html',
})
export class AdminGuestsComponent {

  public users: IAttendee[] = [];
  public usersNotComing: IAttendee[] = [];
  public stats!: IStats;
  public dailyStats!: IDailyStats[];
  public readonly parseDate = toIsoDate;
  public readonly daysStaying = daysStaying;

  public constructor(
    private auth: AuthService,
    public fs: FormService,
  ) {

    onValue(query(dbRef(`/people`)), r => {
      const attendees: Record<string, IAttendee<string>> | null = r.val();
      if (!attendees) {
        alert("NO attendees! Maybe nobody registered yet?");
        return; // database empty, most likely
      }
      const allUsers = Object.values(attendees).map(addDatesToAttendee);
      this.users = allUsers.filter(u => u.attending);
      this.usersNotComing = allUsers.filter(u => !u.attending);
    });

    onValue(query(dbRef(`/stats`)), r => {
      const val: IStats<string> = r.val();
      this.stats = addDatesToStats(val);

      this.dailyStats = Object.keys(this.stats.perDay).map<IDailyStats>(k => ({ day: k, stats: this.stats.perDay[k] }));
    });
  }

  public editAttendee(attendee: IAttendee) {
    this.fs.initRegistrationForm(isoDatesToAttendee(attendee));
    this.fs.openAttendeeModalForm();
  }

  public allergies(foods: IStats["problematicFoods"]): Array<[string, string, number]> {
    return Object.keys(foods ?? {}).map(food => [
      this.fs.foodDetail(food).icon as string,
      this.fs.foodDetail(food).label,
      foods[food],
    ]);
  }

  public taskHelp(tasks: IStats["taskHelp"]): Array<[string, string, number]> {
    return Object.keys(tasks).map(t => [
      this.fs.helpDetail(t).icon as string,
      this.fs.helpDetail(t).label,
      tasks[t],
    ]);
  }


  public availableCarSeats (stats: IStatsPerDay): number {
    return (stats.amountHaveCar + stats.freeCarSeats) - stats.attending;
  }


}
