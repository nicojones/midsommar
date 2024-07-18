import { AuthService } from "@/services/auth.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    public constructor(
      public auth: AuthService,
    ) {

    }

    public signOut (): void {
      this.auth.signOut();
    }
}
