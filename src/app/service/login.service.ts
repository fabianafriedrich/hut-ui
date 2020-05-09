import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  getUsername() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/users`;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /*Post to create new user*/
  create(user: any) {
    return this.http.post(this.baseUrl + '/add', user, this.getHeaders(localStorage.getItem('auth')));
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

  getCurrentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /*Login functionality*/
  login(user: User){
    const auth = 'Basic ' + btoa(user.email + ':' + user.password);
    const request = this.http.get(this.baseUrl + '/login', this.getHeaders(auth));
    request.subscribe(
      data => {
        localStorage.setItem('auth', auth);
        localStorage.setItem('currentUser', JSON.stringify(data.valueOf()));
        this.loggedIn.next(true);
        },
      error => {
        localStorage.removeItem('auth');
        localStorage.removeItem('currentUser');
      });
    return request;
  }
  /*Register functionality*/
  register(user: User) {
    return this.http.post(this.baseUrl + '/registration', user,
      this.getHeaders(localStorage.getItem('auth')));
  }

  logOut() {
  const request = this.http.post(this.baseUrl + '/logout', {});
  request.subscribe(
      data => {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
      });
  }
}
