import { Injectable } from "@angular/core";
import { RippleGlobalOptions } from "@angular/material/core";

@Injectable({providedIn: 'root'})
export class AppGlobalRippleOptions implements RippleGlobalOptions {
  /** Whether ripples should be disabled globally. */
  disabled: boolean = true;
}
