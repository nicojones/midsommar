import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter, RouterModule, withComponentInputBinding } from "@angular/router";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { APP_ROUTES } from "./app.routes";
import { AuthService } from "@/services/auth.service";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    provideRouter(APP_ROUTES, withComponentInputBinding()),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
