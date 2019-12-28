import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { AuthUser } from '../authentication/auth-user.type';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  currentUser: AuthUser;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.currentUser && this.currentUser.token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.currentUser.token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 0) {
          this.router.navigate(['/error', { reason: 'Nie można połączyć się z serwerem. Spróbuj ponownie później' }]);
        }
        else {
          alert(error.error || error.message || '');
        }
        return throwError(error);
      }));
  }
}
