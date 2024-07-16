import { isValidAppPassword } from "@/functions";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";

export const canActivateWebsite: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): MaybeAsync<GuardResult> => {
  const isValidPass = isValidAppPassword();
  return isValidPass;
};
