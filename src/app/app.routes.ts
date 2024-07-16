import { canActivateWebsite } from "@/guards/can-activate-website.guard";
import { isLoggedInGuard } from "@/guards/is-logged-in.guard";
import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const APP_ROUTES: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [
      canActivateWebsite,
      isLoggedInGuard(true),
    ],
    children: [
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
