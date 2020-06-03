import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { ToastrMessages } from '../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private toast: ToastrMessages,
    ) { }
    ////// ================== if auth token is expired redirect to login page ================= //////
    private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
        if (err.status === 401 || err.status === 403) {
            this.authService.logout();
            this.router.navigate(['/auth']);
            this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid User!');

        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('authToken');

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + token),
            });
            return next.handle(cloned)
                .pipe(
                    map((res) => {
                        return res;
                    }),
                    catchError(this.handleAuthError.bind(this)),
                );
        } else {
            return next.handle(req);
        }
    }
}
