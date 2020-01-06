import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import {Device} from '../model/Devices';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  constructor(private http: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(environment.endpoints.users);
  }

  deleteAssociationByUserId(id: number) {
    return this.http.delete(environment.endpoints.users + '-associate/' + id.toString());
  }

  getUserById(id: number) {
    return this.http.get<User>(environment.endpoints.users + '/' + id.toString());
  }

  getUserGroupById(id: number) {
    return this.http.get<User>(environment.endpoints.users + '-userGroup/' + id.toString());
  }

  updateUser(id: number, user: User) {
    return this.http.put(environment.endpoints.users + '/' + id.toString(), user);
  }

  ResetUser(id: number) {
     return this.http.get('http://localhost:3001/api/reset/user/' + id.toString());  // todo change this
   }

  deleteUser(id: number) {
    return this.http.delete(environment.endpoints.users + '/' + id.toString());
  }


  createUser(user: User) {
    return this.http.post(environment.endpoints.users, JSON.stringify(user, function(user, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }
}

