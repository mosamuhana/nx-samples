import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { SpinnerService } from './../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
	constructor(private spinnerService: SpinnerService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.spinnerService.show();

		return next.handle(req).pipe(
      tap((e: HttpEvent<any>) => {
        if (e instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      }),
      catchError(err => {
        this.spinnerService.hide();
        return throwError(() => err);
      }),
		);
	}
}
