import { FormService } from "@/services/form.service";
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quotas',
  templateUrl: './quotas.component.html',
})
export class QuotasComponent {

  @Input({ required: true }) public quotas: Record<string, number> = {};
  @Input({ required: true }) public numGuests: number = 0;

  public constructor(
    public fs: FormService,
  ) {

  }
}
