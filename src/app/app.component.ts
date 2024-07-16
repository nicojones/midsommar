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
  public isAuthed: boolean = false;
  public title = 'sweden';
  public pass = new FormControl<string>("");

  constructor() {
    this.setIsAuthed();
  }

  public setPassword(pass: string) {
    localStorage.setItem(STORAGE_KEY.pass, pass);
    if (!this.setIsAuthed()) {
      alert("Invalid password. Please double-check!");
    }
  }

  public setIsAuthed(): boolean {
    this.isAuthed = isValidAppPassword();;
    return this.isAuthed;
  }

  public handlePassSubmit(e: PDefault): void {
    e.preventDefault();
    e.stopPropagation();
    this.setPassword(this.pass.value ?? "");
  }
}
