import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingSpinnerService } from '../_services/loading-spinner.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private spinnerService: LoadingSpinnerService) { }

  intercept(req: HttpRequest<unknown>,next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();

    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}
