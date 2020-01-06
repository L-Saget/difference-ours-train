
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {User} from '../model/User';
import {UserAdminService} from './userAdmin.service';
import {Util} from 'leaflet';
import {NgxPermissionsService} from 'ngx-permissions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private val: Subject<Boolean>;

  constructor(private http: HttpClient, private router: Router, private api: UserAdminService,
              private permissionsService: NgxPermissionsService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.val = new Subject<Boolean>();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value; // todo : decode token
  }


  login(email: string, password: string) {
    return this.http.post<User>('http://localhost:3001/api/auth/login', { email, password })
      .pipe(
        map(user => {

          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        }));
  }

  public static getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public isUserAdmin(): boolean {
    return (AuthenticationService.getDecodedAccessToken(JSON.parse(localStorage.getItem('currentUser')).token).role >= 2);
  }

  public isUserGestionnaire(): boolean {
    return (AuthenticationService.getDecodedAccessToken(JSON.parse(localStorage.getItem('currentUser')).token).role >= 1);
  }

  public isUserSimpleUser(): boolean {
    return (AuthenticationService.getDecodedAccessToken(JSON.parse(localStorage.getItem('currentUser')).token).role >= 0);
  }

  logout() {
    //  const currentUserToken = this.currentUserValue.token;
    //  const tokenInfo = this.getDecodedAccessToken(currentUserToken); // decode token
    //  const userId = tokenInfo.id;
    //
    // this.api.ResetUser(userId).subscribe(user => {
    //    // todo reset
    // }) // + token
    // // this.http.get('http://localhost:3001/api/auth/reset/user/' + userId.toString()); //remove refresh token
    //  // todo  : gestions erreurs
    this.permissionsService.flushPermissions();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.refreshToken;
    return this.http.post<User>('http://localhost:3001/api/auth/refresh', { 'refreshToken': token })
      .pipe(
        map(user => {

          if (user && user.token) {
            user.refreshToken = JSON.parse(localStorage.getItem('currentUser')).refreshToken;
            // a laisser sinon ne refresh qu'une seule fois. TODO : corriger l'erreur

            localStorage.setItem('currentUser', JSON.stringify(user)); // TODO save refresh token
          }
          return <User>user;
        }));
  }

  getAuthToken(): string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      return currentUser.token;
    }

    return '';
  }
}
