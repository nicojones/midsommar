import { ADMIN_UIDS } from "@/definitions";
import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { IStatsAttendee, PDefault } from "@/types";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
})
export class GuestInfoComponent {

  @Input({ required: true }) public info!: IStatsAttendee<Date>;
  @Input() public showAllergies: boolean = false;
  @Input() public showTaskHelp: boolean = false;
  @Input() public showContactDetails: boolean = false;

  public readonly hostIds = ADMIN_UIDS;

  public constructor(
    public auth: AuthService,
    public fs: FormService,
  ) {

  }

  public confirm(name: string, contactBy: string, e: PDefault): void {
    if (!window.confirm(`Contact ${name} by ${contactBy}?`)) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

}
