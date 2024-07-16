import { FB_UI_CONFIG, fbUi } from "@/firebase";
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {

  public ngAfterViewInit() {
    // The start method will wait until the DOM is loaded.
    fbUi.start('#firebase-login', FB_UI_CONFIG);
  }
}
