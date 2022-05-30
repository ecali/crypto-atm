import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, of } from 'rxjs';
import { UtilsMapService } from 'src/app/services/utils-map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  currentLocation = { lat: 40.730610, lng: -73.935242 }

  constructor(private utilsMapService: UtilsMapService) { }

  ngOnInit(): void {
      this.setLocation().subscribe(_ => {
        let loader = new Loader({
          apiKey: environment.apikey,
        })
        loader.load().then(() => {
          const map = new google.maps.Map(document.getElementById('map')!, {
            center: this.currentLocation,
            zoom: 6
          });
          new google.maps.Marker({
            position: this.currentLocation,
            map,
          });
          if (this.utilsMapService.mapMarkerList.length > 0) {
            this.utilsMapService.mapMarkerList.forEach(marker => {
              new google.maps.Marker({
                position: marker.position,
                map,
                label: marker.label,
                icon: marker.icon
              });
            })
          }
        })

      })
  }

  setLocation(): Observable<boolean> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude });
      return of(true);
    } else {
      return of(true);
    }

  }


}
