import { comingOrInterested, daysStaying } from "@/functions";
import { AuthService } from "@/services/auth.service";
import { IStats, IStatsAttendee } from "@/types";
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
})
export class GuestsComponent {

  @Input({ required: true }) public stats$ = new BehaviorSubject<IStats | null>(null);
  public readonly comingOrInterested = comingOrInterested;

  public constructor(
    public auth: AuthService,
  ) {
  }

  public timeInWords (attendee: IStatsAttendee<Date>): string {
    return daysStaying(attendee);
  }

}
