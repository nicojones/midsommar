import { canActivateAdmin } from "@/guards/can-activate-admin.guard";
import { canActivateWebsite } from "@/guards/can-activate-website.guard";
import { isLoggedInGuard } from "@/guards/is-logged-in.guard";
import { Routes } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";

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
        path: "admin",
        component: AdminComponent,
        canActivate: [
          canActivateAdmin,
        ],
      },
      // {
      //   path: "gallery",
      //   component: // TODO -- create gallery page
      // },
      // {
      //   path: "activities",
      //   component: // TODO - create activities page
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
