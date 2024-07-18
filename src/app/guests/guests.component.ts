import { ADMIN_UIDS } from "@/definitions";
import { AuthService } from "@/services/auth.service";
import { IStats } from "@/types";
import { Component, Input } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
})
export class GuestsComponent {

  @Input({ required: true }) public stats$ = new BehaviorSubject<IStats | null>(null);

  public readonly hostIds = ADMIN_UIDS;

  public constructor(
    public auth: AuthService,
  ) {

  }

}
