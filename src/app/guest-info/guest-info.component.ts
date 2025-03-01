import { ADMIN_UIDS } from "@/definitions";
import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { IStatsAttendee, PDefault } from "@/types";
import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
  // styles: `:host { display: contents; }`,
  // encapsulation: ViewEncapsulation.None,
})
export class GuestInfoComponent {

  @ViewChild('tmp') tmp: any;

  // @HostBinding('style.display') display = 'contents';

  @Input({ required: true }) public info!: IStatsAttendee<Date>;
  @Input() public showAllergies: boolean = false;
  @Input() public showTaskHelp: boolean = true;
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
