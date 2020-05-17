import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/users`;
  }
  /*Creating Headers to sent into the HTTP request*/
  getHeaders(auth){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: auth
      })
    };
  }

  /*Register functionality*/
  update(user: User) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user.valueOf()));

    return this.http.put(this.baseUrl + '/update', user,
      this.getHeaders(localStorage.getItem('auth')));
  }
}
