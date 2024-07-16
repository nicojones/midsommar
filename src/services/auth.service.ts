import { STORAGE_KEY } from "@/definitions";
import { fbAuth } from "@/firebase";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "firebase/auth";

@Injectable({ providedIn: "root" })
export class AuthService {

  /**
   * The logged in user
   */
  public user: User | null = null;

  public constructor(
    private router: Router,
  ) {
    fbAuth.onAuthStateChanged((user: User | null) => {
      if (user) {
        localStorage.setItem(STORAGE_KEY.loggedIn, "1");
      } else {
        localStorage.removeItem(STORAGE_KEY.loggedIn);
      }
      console.log("USER?", user);
      this.user = user;
    });
  }

  public get isAuthed$(): Promise<boolean> {
    return fbAuth.authStateReady().then(() => {
      return !!fbAuth.currentUser;
    });
  }


  public get isAuthed(): boolean {
    return !!localStorage.getItem(STORAGE_KEY.loggedIn);
  }

  public signOut(): void {
    fbAuth.signOut();
    this.router.navigateByUrl("/");
  }
}
