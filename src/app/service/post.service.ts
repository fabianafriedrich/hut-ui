import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Post} from '../models/post';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/posts`;
  }

  /*Get posts from the API passing the auth token by parameter */
  listAll() {
    return this.http.get<Array<Post>>(this.baseUrl,
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

  /*create post functionality*/
  createPost(post: Post) {
    return this.http.post(this.baseUrl, post,
      this.getHeaders(localStorage.getItem('auth')));
  }
}
