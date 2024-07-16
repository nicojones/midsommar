import { AuthService } from "@/services/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

export const isLoggedInGuard = (mustBeLoggedIn: boolean): CanActivateFn =>
  (
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): MaybeAsync<GuardResult> => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isAuthed$.then(loggedIn => {
      if (mustBeLoggedIn) {
        if (!loggedIn) {
          console.log("Redirecting to /login");
          router.navigate(["/login"]);
          return false;
        }
      } else {
        if (loggedIn) {
          console.log("Redirecting to /");
          router.navigate(["/"]);
          return false;
        }
      }
      return true;
    });
  };
