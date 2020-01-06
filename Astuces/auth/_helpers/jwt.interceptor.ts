import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaderResponse,
  HttpSentEvent,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {User} from '../../model/User';
import {AuthenticationService} from '../../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, public snackBar: MatSnackBar) { }

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

      // if (err.status === 403)


  // tslint:disable-next-line:max-line-length
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {

    return next.handle(this.addTokenToRequest(request, this.authService.getAuthToken()))
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {



            if (err.status === 401) {
              if (err.error.code === 94011) {
                this.snackBar.open('Erreur : Vous n\'etes pas autorisé à acceder à cette ressource...',  'X', {panelClass: ['error']});
              } else {
                if (err.error.code === 9401) {
                  return this.handle401Error(request, next);
                } else {
                  this.snackBar.open('Erreur : Email ou Mot de passe invalide',  'X', {panelClass: ['error']});
                  this.authService.logout();
                  setTimeout(() => {
                      location.reload(true);
                    },
                    1000);
                }
              }
            }



            if (err.status === 403) {
              console.log('error 403');
              return <any>this.authService.logout();
            }
            if (err.status === 400) {
              console.log('error 400');
              return <any>this.authService.logout();
            }

            if (err.status === 0) {
              // console.dir('error ERR_CONNECTION_REFUSED');
              // err.message
              this.snackBar.open('Erreur : Serveur injoignable, Veuillez réessayer plus tard...',  'X', {panelClass: ['error']});
              // location.reload(true);
            }
          } else {
            return throwError(err);
          }
        }));
  }



  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // console.log("j'envoie le jwt : " + token);
    return request.clone({ setHeaders: {
        Authorization: `JWT ${token}`// add jwt acces token to the request
      }});
    // return request.clone({ setHeaders: { Authorization: `Bearer ${token}`}});

  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log('handle error 401');

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authService.refreshToken()
        .pipe(
          switchMap((user: User) => {
            if (user) {
              this.tokenSubject.next(user.token);
              localStorage.setItem('currentUser', JSON.stringify(user));
              return next.handle(this.addTokenToRequest(request, user.token));
            }

            return <any>this.authService.logout();
          }),
          catchError(err => {
            return <any>this.authService.logout();
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;

      return this.tokenSubject
        .pipe(filter(token => token != null),
          take(1),
          switchMap(token => {
            return next.handle(this.addTokenToRequest(request, token));
          }));
    }
  }
}
