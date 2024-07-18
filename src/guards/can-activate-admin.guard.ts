import { AuthService } from "@/services/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

export const canActivateAdmin: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<boolean> => {
  const isAdmin = inject(AuthService).isAdmin;
  const router = inject(Router);
  if (!isAdmin) {
    router.navigateByUrl("/");
  }
  return isAdmin;
};
