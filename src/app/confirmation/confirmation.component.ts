import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dbRef } from "@/firebase";
import { addDatesToStats, comingOrInterested } from "@/functions";
import { FormService } from "@/services/form.service";
import { IAttendee, IDailyStats, IStats } from "@/types";
import { get, onValue, query } from "firebase/database";
import { AuthService } from '@/services/auth.service';
import { EARLIEST_POSSIBLE_DATE, LATEST_POSSIBLE_DATE } from '@/definitions';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  public stats!: IStats;
  public dailyStats!: IDailyStats[];
  public readonly comingOrInterested = comingOrInterested;

  constructor(
    public fs: FormService,
    private router: Router,
    auth: AuthService,
  ) {

    get(query(dbRef(`/people/${auth.user.uid}`)))
      .then(r => r.val())
      .then((attendee: IAttendee<string> | null) => {
        this.fs.initRegistrationForm(attendee);

        // Check if user has booked
        if (!attendee?.booked) {
          this.router.navigate(['/']);
          return;
        }
      });
  }

  ngOnInit() {

    // Fetch stats
    onValue(query(dbRef(`/stats`)), r => {
      const val: IStats<string> = r.val();
      this.stats = addDatesToStats(val);
      this.dailyStats = Object.keys(this.stats.perDay).map<IDailyStats>(k => ({
        day: k,
        stats: this.stats.perDay[k]
      }));

      // Filter out days outside of event range
      this.dailyStats = this.dailyStats.filter(day => {
        const date = +new Date(day.day);
        return date >= +EARLIEST_POSSIBLE_DATE && date <= +LATEST_POSSIBLE_DATE;
      });

    });
  }
} 