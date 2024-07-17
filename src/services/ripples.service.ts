import { RIPPLES_ENABLED } from "@/definitions";
import { Injectable } from "@angular/core";
import { RippleGlobalOptions } from "@angular/material/core";

@Injectable({providedIn: 'root'})
export class AppGlobalRippleOptions implements RippleGlobalOptions {
  /** Whether ripples should be disabled globally. */
  disabled: boolean = RIPPLES_ENABLED;
}
