import { AuthService } from "@/services/auth.service";
import { StoreService } from "@/services/store.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    public constructor(
      private auth: AuthService,
      public ss: StoreService,
    ) {

    }

    public signOut (): void {
      this.auth.signOut();
    }
}
