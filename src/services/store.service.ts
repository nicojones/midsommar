import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { dbRef } from "@/firebase";
import { onValue, query } from "firebase/database";
import { BehaviorSubject } from "rxjs";
import { IAtendee, IStats } from "@/types";

@Injectable()
export class StoreService {

  public stats$ = new BehaviorSubject<IStats | null>(null);
  public adminPeople$ = new BehaviorSubject<IAtendee[] | null>(null);

  public constructor(
    private auth: AuthService,
  ) {
    onValue(query(dbRef("/stats")), v => {
      const _stats: IStats = v.val();
      // console.log("new data!", _stats.attending, _stats);
      const _id = v.key;
      this.stats$.next(_stats);
    });

    onValue(query(dbRef("/people")), v => {
      const _atendees: Record<string, IAtendee> = v.val();
      this.adminPeople$.next(Object.values(_atendees));
    });
  }
}
