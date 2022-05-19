import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venues } from '../model/atm';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  atmApiUrl = 'assets/json/venues.json';

  constructor(private http: HttpClient) { }

  getAtms(): Observable<Venues>{
    return this.http.get<Venues>(this.atmApiUrl);
  }
}
