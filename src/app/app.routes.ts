import { canActivateAdmin } from "@/guards/can-activate-admin.guard";
import { canActivateWebsite } from "@/guards/can-activate-website.guard";
import { isLoggedInGuard } from "@/guards/is-logged-in.guard";
import { Routes } from '@angular/router';
import { AdminGuestsComponent } from "./admin/admin-guests.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { GalleryComponent } from "@/app/gallery/gallery.component";
import { AdminEmailsComponent } from "./admin/admin-emails/admin-emails.component";
import { InfoComponent } from "./info/info.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";

export const APP_ROUTES: Routes = [
  {
    path: "",
    canActivate: [
      canActivateWebsite,
      isLoggedInGuard(true),
    ],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "confirmation",
        component: ConfirmationComponent,
      },
      {
        path: "admin",
        canActivate: [
          canActivateAdmin,
        ],
        children: [
          {
            path: "guests",
            component: AdminGuestsComponent,
          },
          {
            path: "emails",
            component: AdminEmailsComponent,
          },
        ],
      },
      {
        path: "gallery",
        component: GalleryComponent,
      },
      {
        path: "info",
        component: InfoComponent,
      },
      // {
      //   path: "activities",
      //   component: // TODO Céline - create activities page (no need for UI, just components)
      // }
    ],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [
      isLoggedInGuard(false),
    ],
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
