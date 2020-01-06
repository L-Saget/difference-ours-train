import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {UsersGroup} from '../model/UsersGroups';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersGroupsAdminService {

  constructor(private http: HttpClient) { }

  getUsersGroupList(): Observable<UsersGroup[]> {
    return this.http.get<UsersGroup[]>(environment.endpoints.usersGroups);
  }

  getUsersGroupById(id: number) {
    return this.http.get<UsersGroup>(environment.endpoints.usersGroups + '/' + id.toString());
  }


  getUsersByUsersGroupId(id: number) {
     return this.http.get<UsersGroup>(environment.endpoints.usersGroups + '-user/' + id.toString());
  }


  updateUsersGroup(id: number, usersGroup: UsersGroup) {
    return this.http.put(environment.endpoints.usersGroups + '/' + id.toString(), usersGroup);
  }

  deleteAssociationByUsersGroupId(id: number) {
     return this.http.delete(environment.endpoints.usersGroups + '-associate/' + id.toString());
  }

  deleteUsersGroup(id: number) {
    return this.http.delete(environment.endpoints.usersGroups + '/' + id.toString());
  }

  AssociateUsersToUsersGroupByUsersGroupId(id: number, usersIdList: number[]) {
    return this.http.post(environment.endpoints.usersGroups + '-associate-users-to-usersGroupId/' + id.toString(),
      JSON.stringify(usersIdList, function(dev, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }

  createUsersGroup(usersGroup: UsersGroup) {
    return this.http.post(environment.endpoints.usersGroups, JSON.stringify(usersGroup, function(group, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }
}

