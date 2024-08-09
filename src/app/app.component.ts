import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { isValidAppPassword } from "@/functions/is-valid-app-password.function";
import { PDefault } from "@/types";
import { STORAGE_KEY } from "@/definitions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public pass = new FormControl<string>("");

  constructor() {
  }

  public get isAuthed (): boolean {
    return isValidAppPassword();
  }

  public setPassword(pass: string) {
    localStorage.setItem(STORAGE_KEY.pass, pass.toLowerCase());
    if (!this.isAuthed) {
      alert("Invalid password. Please double-check!");
    }
  }

  public handlePassSubmit(e: PDefault): void {
    e.preventDefault();
    e.stopPropagation();
    this.setPassword(this.pass.value ?? "");
    if (this.isAuthed) {
      window.location.reload();
    }
  }
}
