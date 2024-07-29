import { Injectable, NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule, NativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { CustomDatepickerModule } from "./date-picker.module";

const MODULES: any[] = [
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatRippleModule,
  MatExpansionModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatCardModule,
  MatSelectModule,
  MatMenuModule,
  MatTooltipModule,

  CustomDatepickerModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  exports: [
    ...MODULES,
  ],
  providers: [
    // ...
  ],
})
export class MaterialModule { }
