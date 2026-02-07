import { Routes } from "@angular/router";
import { AuthGuardGuard } from "./shared/service/auth-guard.guard";

export const APP_ROUTES: Routes = [
  {
    path: "user",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: "patient",
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardGuard],
   },
   {
     path: "nurse",
     loadChildren: () => import('./nurse/nurse.module').then(m => m.NurseModule),
     canActivate: [AuthGuardGuard]
    },
   {
     path: "physician",
     loadChildren: () => import('./physician/physician.module').then(m => m.PhysicianModule),
     canActivate: [AuthGuardGuard]
    },
  {
    path: "**",                  //when no url ,matches then you can redirect to any url
    redirectTo: "/user/login"
  }
];
