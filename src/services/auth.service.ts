import { STORAGE_KEY } from "@/definitions";
import { fbAuth } from "@/firebase";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "firebase/auth";

@Injectable({ providedIn: "root" })
export class AuthService<UserType extends User | null = User> {

  /**
   * The logged in user
   */
  public user: UserType = null as unknown as UserType;

  public constructor(
    private router: Router,
  ) {
    fbAuth.onAuthStateChanged((user: User | null) => {
      if (user) {
        localStorage.setItem(STORAGE_KEY.loggedIn, "1");
      } else {
        localStorage.removeItem(STORAGE_KEY.loggedIn);
      }
      /**
       * Trick to make sure `user` is still typed as User.
       * In those pages where `user` is null, we don't access it, and if we do,
       * we can construct the service as:
       * public construct(private auth: AuthService<User | null>) {}
       * and it will be properly typed
       */
      this.user = user as UserType;
    });
  }

  public get isAuthed$(): Promise<boolean> {
    return fbAuth.authStateReady().then(() => {
      return !!fbAuth.currentUser;
    });
  }

  public get userId(): string | undefined {
    return this.user?.uid;
  }

  public get isAuthed(): boolean {
    return !!localStorage.getItem(STORAGE_KEY.loggedIn);
  }

  public get identifier(): string {
    return (
      this.user?.email ??
      this.user?.phoneNumber ??
      this.user?.displayName ??
      `ID: ${this.user?.uid ?? "No idea who"}`
    );
  }

  public async signOut(): Promise<void> {
    await fbAuth.signOut();
    window.location.reload();
  }
}
