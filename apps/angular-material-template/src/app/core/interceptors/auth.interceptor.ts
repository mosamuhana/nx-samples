import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private authService: AuthenticationService,
		private router: Router,
		private dialog: MatDialog,
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const user = this.authService.getCurrentUser();

		if (user && user.token) {
			const cloned = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + user.token),
			});

			return next.handle(cloned).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.dialog.closeAll();
              this.router.navigate(['/auth/login']);
            }
          }
          return throwError(() => err);
        }),
			);
		} else {
			return next.handle(req);
		}
	}
}
