import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venues } from '../model/atm';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  atmApiUrl = 'assets/json/venues.json';

  constructor(private http: HttpClient) { }

  getAtms(): Observable<Venues> {
    return this.http.get<Venues>(this.atmApiUrl);
  }

  getReverseGeocoding() {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'geocodeapi.p.rapidapi.com',
      'x-rapidapi-key': environment.rapidApiKey
    });
    let options = { params: {latitude: '40.63380384389354', longitude: '-74.40753570369408'} , headers: headers }
    return this.http.get<any>('https://geocodeapi.p.rapidapi.com/GetTimezone', options)
  }


}
