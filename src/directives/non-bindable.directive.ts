import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[ngNonBindable]',
})
export class NgNonBindableDirective {
  @Input('ngNonBindable') ngNonBindable = true;

  constructor() { }
}
