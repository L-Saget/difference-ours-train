import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


export interface Difference {
  diff: string;
  autor: string;
}

export class Difference {
  diff: string;
  autor: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Credentials': 'true',

  })
};

@Injectable({
  providedIn: 'root'
})
export class DifferencesService {

  constructor(private http: HttpClient) { }

  getRandomDiff(): Observable<Difference> {
    return this.http.get<Difference>(environment.endpoints.differences + '/random');
  }

  getAllDiff(): Observable<Difference[]> {
    return this.http.get<Difference[]>(environment.endpoints.differences);
  }

  getDiffById(id: number) {
    return this.http.get<Difference>(environment.endpoints.differences + '/' + id.toString());
  }

  createDiff(diff: Difference) {
    return this.http.post(environment.endpoints.differences, JSON.stringify(diff, function(diff, value) {
      if (value === '') {
        return undefined;
      }
      return value;
    }), httpOptions);
  }
}






