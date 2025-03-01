import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { AppGlobalRippleOptions } from "@/services/ripples.service";
import { StoreService } from "@/services/store.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterLink, RouterOutlet, withComponentInputBinding } from "@angular/router";
import { AdminGuestsComponent } from "./admin/admin-guests.component";
import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { AttendingButtonComponent } from "./form/attending-button/attending-button.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { GuestInfoComponent } from "./guest-info/guest-info.component";
import { GuestsComponent } from "./guests/guests.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { InfoComponent } from "./info/info.component";
import { MaterialModule } from "./material/material.module";
import { QuotasComponent } from "./quotas/quotas.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuestsComponent,
    HomeComponent,
    AdminGuestsComponent,
    GalleryComponent,
    GuestInfoComponent,
    InfoComponent,
    QuotasComponent,
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AttendingButtonComponent,
  ],
  providers: [
    AuthService,
    StoreService,
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: AppGlobalRippleOptions },
    FormService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
