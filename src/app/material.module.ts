import { Injectable, NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule, NativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }
  // override format(date: Date, displayFormat: Record<any, any>): string {
  //   return super.format(date, displayFormat);
  // }
}

const MODULES: any[] = [
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatRippleModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatNativeDateModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ch-DE' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
})
export class MaterialModule { }
