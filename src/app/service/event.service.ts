import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<any[]> {
    return this.http.get('../../assets/json/calendarevents.json').pipe(map(
      (data: any) => {
        return data.json();
      }));
  }

}
