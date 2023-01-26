import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../models/authenticationResponse';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  accessToken = localStorage.getItem("accessToken");
  refreshToken = localStorage.getItem("refreshToken");
  constructor(private authService: AuthService, private toastrService: ToastrService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          if(this.accessToken || this.refreshToken) {
            if (this.accessToken) localStorage.removeItem("accessToken");
            if (this.refreshToken) localStorage.removeItem("refreshToken");

            if(this.refreshToken){
              return this.authService.refreshToken(this.refreshToken)
              .pipe(
                switchMap((res:AuthenticationResponse) => {
                  localStorage.setItem("accessToken", res.accessToken);
                  localStorage.setItem("refreshToken", res.refreshToken);
                  return next.handle(this.reSendRequest(request));
                }),
                catchError((error) => {
                  return throwError(error)
                })                
              )
            }
          }
          this.router.navigate(["login"]);
          this.toastrService.info("You should log in.");
          return next.handle(request);
        }
        else if (this.refreshToken != null && error.status === 401) {
          return this.authService.refreshToken(this.refreshToken)
          .pipe(
            switchMap((res:AuthenticationResponse) => {
              localStorage.setItem("accessToken", res.accessToken);
              localStorage.setItem("refreshToken", res.refreshToken);
              return next.handle(this.reSendRequest(request));
            }),
            catchError((error) => {
              return throwError(error)
            })
          )
        } 
        else{
          return throwError(error);
        }
      })
    );
  }
  reSendRequest = (request: HttpRequest<any>): HttpRequest<any> => {
		if(this.accessToken){
      request = request.clone({
        headers: request.headers.set("Authorization","Bearer " + this.accessToken)
      })
    }
    return request;
	};

}


