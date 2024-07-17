import { MaterialModule } from "@/app/material.module";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatRipple } from "@angular/material/core";

@Component({
  selector: 'app-attending-button',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './attending-button.component.html',
})
export class AttendingButtonComponent implements OnInit {

  @Input() public animateOnInit: boolean = false;
  @Input({ required: true }) public checked: boolean = true;
  @Output() public change = new EventEmitter<boolean>();

  @Input() public classes: string = "";

  @ViewChild(MatRipple) public ripple!: MatRipple;
  private rippleAnimationTimeout: any = null;

  public ngOnInit(): void {
    if (this.animateOnInit) {
      this.rippleAnimationTimeout = setTimeout(() => {
        const rippleRef = this.ripple.launch({
          persistent: true,
          centered: true,
          color: "fucsia",
          animation: { enterDuration: 2000, exitDuration: 1000 },
        });

        // Fade out the ripple later.
        rippleRef.fadeOut();
      }, 5000);
    }
  }

  public handleChange (nextState: boolean): void {
    // Do not animate if the user already interacted
    clearTimeout(this.rippleAnimationTimeout);
    // Emit event.
    this.change.emit(nextState);
  }

}
