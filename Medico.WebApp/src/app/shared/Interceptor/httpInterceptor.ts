import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

 intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
   var a = 10
   var a = 20
   console.log(a)
 // add authorization header to request
 //Get Token data from local storage
 let tokenInfo = JSON.parse(sessionStorage.getItem('user'));

   if (tokenInfo && tokenInfo.token) {
     request = request.clone({
       setHeaders: {
         "Authorization": `Bearer ${tokenInfo.token}`
       }
     });
   }

 return newRequest.handle(request);
 }
}
