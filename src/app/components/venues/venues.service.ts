import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Atm } from 'src/app/model/atm';
import { MapMarker } from 'src/app/model/map';
import { RemoteService } from 'src/app/services/remote.service';
import { UtilsMapService } from 'src/app/services/utils-map.service';

@Injectable({
  providedIn: 'root'
})
export class VenuesService {

  allAtms: Atm[] = [];

  constructor(private remote: RemoteService, private utilsMapService: UtilsMapService) { }

  getVenues(): Observable<Atm[]> {
    return this.remote.getAtms().pipe(switchMap(venues => {
      this.allAtms = this.sortAtms(venues.venues);
      return of(this.allAtms.slice(0, 100));
    }))
  }

  sortAtms(atms: Atm[]): Atm[] {
    return atms.sort((a, b) => {
      return a.id < b.id ? -1 : 1;
    })
  }

  getMarkerIcon(): string{
    return this.utilsMapService.bluMarkerIcon;
  }

  setMapMarkerList(list: MapMarker[]): void{
    this.utilsMapService.mapMarker = list;
  }

  getReverseGeocoding(){
    this.remote.getReverseGeocoding().subscribe(res => {
      // console.log(res);
    })
  }

  retriveIconFromCategory(category: string): string {
    switch (category.trim().toLowerCase()) {
      case 'food':
        return 'restaurant';
      case 'lodging':
        return 'hotel';
      case 'shopping':
      case 'grocery':
      case 'retail':
      case 'trezor retailer':
        return 'store';
      case 'nightlife':
        return 'nightlife';
      case 'attractions':
      case 'attraction':
        return 'attractions';
      case 'transport':
        return 'directions_bus';
      case 'cafe':
        return 'local_cafe';
      case 'atm':
      case 'ATM':
        return 'local_atm';
      case 'sports':
        return 'sports_tennis';
      case 'Travel Agency':
        return 'flight_takeoff';
      case 'Educational Business':
        return 'work_history';
      case 'services':
        return 'medical_information';
      default:
        return 'savings';
        break;
    }
  }
}

