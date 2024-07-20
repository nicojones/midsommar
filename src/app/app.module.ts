import { AuthService } from "@/services/auth.service";
import { AppGlobalRippleOptions } from "@/services/ripples.service";
import { StoreService } from "@/services/store.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterLink, RouterOutlet, withComponentInputBinding } from "@angular/router";
import { AppComponent } from "./app.component";
import { APP_ROUTES } from "./app.routes";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MaterialModule } from "./material.module";
import { AttendingButtonComponent } from "./form/attending-button/attending-button.component";
import { GuestsComponent } from "./guests/guests.component";
import { AdminComponent } from "./admin/admin.component";
import {RegistrationService} from "@/services/registration.service";
import {GalleryComponent} from "@/app/gallery/gallery.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuestsComponent,
    HomeComponent,
    AdminComponent,
    GalleryComponent,
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
    RegistrationService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
