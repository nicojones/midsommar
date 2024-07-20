import { ADMIN_UIDS, PROBLEMATIC_FOODS } from "@/definitions";
import { AuthService } from "@/services/auth.service";
import { IStatsAttendee, IValueLabel } from "@/types";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
})
export class GuestInfoComponent {

  @Input({ required: true }) public info!: IStatsAttendee<Date>;

  public readonly hostIds = ADMIN_UIDS;

  public constructor(
    private auth: AuthService,
  ) {

  }

  public foodDetail(value: string): IValueLabel {
    return PROBLEMATIC_FOODS.find(food => food.value === value) ?? ({} as IValueLabel);
  }

  public get showAllergies (): boolean {
    return this.auth.isAdmin;
  }

}
