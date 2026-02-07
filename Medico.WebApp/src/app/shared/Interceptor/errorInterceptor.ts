import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 constructor(private authenticationService: AuthService, private router: Router) { }

 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
 return newRequest.handle(request).pipe(catchError((err) =>{
  const user = sessionStorage.getItem('user')
  if (user != null && err.status === 401) {
   //if 401 response returned from api, logout from application & redirect to login page.
   alert("Session Expired. Login again!!");
   //setTimeout(() => {
     this.authenticationService.logout();
  // }, 3000);
 }
console.log(err)
 return throwError(err);
 }));
 }
}
