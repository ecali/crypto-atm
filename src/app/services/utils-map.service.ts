import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MapMarker } from '../model/map';

@Injectable({
  providedIn: 'root'
})
export class UtilsMapService {

  constructor() { }

  private bluMarker = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
  private markerList: MapMarker[] = [];

  get bluMarkerIcon(){
    return this.bluMarker;
  }

  set mapMarker(list: MapMarker[]){
    this.markerList = list;
  }

  get mapMarkerList() : MapMarker[]{
    return this.mapMarkerList;
  }

}
