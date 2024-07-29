import { Injectable, NgModule } from "@angular/core";
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
  // override format(date: Date, displayFormat: Record<any, any>): string {
  //   return super.format(date, displayFormat);
  // }
}

@NgModule({
  imports: [
    MatDatepickerModule,
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ch-DE' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class CustomDatepickerModule {}
