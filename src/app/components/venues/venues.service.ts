import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Atm } from 'src/app/model/atm';
import { RemoteService } from 'src/app/services/remote.service';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  allAtms: Atm[] = [];

  constructor(private remote: RemoteService) { }

  getVenues(): Observable<Atm[]> {
    return this.remote.getAtms().pipe(switchMap(venues => {
      this.allAtms = this.sortAtms(venues.venues);
      return of(this.allAtms.slice(0, 100));
    }))
  }

  sortAtms(atms: Atm[]): Atm[]{
    return atms.sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    })
  }
}

