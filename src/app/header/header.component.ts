import { AuthService } from "@/services/auth.service";
import { FormService } from "@/services/form.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

    public constructor(
      public auth: AuthService,
      public fs: FormService,
    ) {

    }

    public signOut (): void {
      this.auth.signOut();
    }
}
