import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/users`;
  }
  /*Send email functionality*/
  sendEmail(user: User){
    return this.http.post(this.baseUrl + '/contactus', user,
      this.getHeaders(localStorage.getItem('auth')));
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

}
