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
import { L10nTranslationService } from 'angular-l10n';
import { AuthUser } from '../../auth/auth-user.type';
import { AuthenticationService } from '../../auth/authentication.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  currentUser: AuthUser;
  constructor(
    private router: Router,
    private translation: L10nTranslationService,
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
        if (error.status === 0) {
          this.router.navigate(['/error', { reason: this.translation.translate('unableToConnectToTheServer') + ' ' + this.translation.translate('tryAgainLater') }]);
        }
        else if (error.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        }
        else {
          alert(error.error || error.message || '');
        }
        return throwError(error);
      }));
  }
}
