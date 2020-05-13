import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Answer} from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/answers`;
  }
  /*Get posts from the API passing the auth token by parameter */
  getAnswers() {
    return this.http.get<Array<Answer>>(this.baseUrl,
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
