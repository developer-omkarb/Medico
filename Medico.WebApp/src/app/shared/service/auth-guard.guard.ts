import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanActivateChild {
  constructor(private route: Router, private util: UtilService) {

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var currentUrl = route.url[0].path;
    var userDetails = this.util.getUserFromSession();
    if (userDetails != null) {
      if (userDetails.role != "Admin") {
        if (!currentUrl.toLowerCase().includes(userDetails.role.toLowerCase())) {
          console.log("Not authorized");
          if (userDetails.role == "Patient") {
            this.route.navigate(['/patient/error']);
          }
          else if (userDetails.role == "Nurse") {
            this.route.navigate(['/nurse/error']);
          }
          else if (userDetails.role == "Physician") {
            this.route.navigate(['/physician/error']);
          }
          return false;
        }
      }
    }
    console.log("Authorized");
    return true;
  }
  
}
