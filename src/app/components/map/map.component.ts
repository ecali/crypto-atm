import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, of } from 'rxjs';
import { Venues } from 'src/app/model/atm';
import { RemoteService } from 'src/app/services/remote.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  longitude: number = -73.935242;
  latitude: number = 40.730610;
  atmIcon = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';
  venues!: Venues;

  constructor(private remote: RemoteService) { }

  ngOnInit(): void {
    this.remote.getAtms().subscribe(res => {
      this.setLocation().subscribe(_ => {
        let loader = new Loader({
          apiKey: environment.apikey,
        })
        loader.load().then(() => {
          const map = new google.maps.Map(document.getElementById('map')!, {
            center: { lat: this.latitude, lng: this.longitude },
            zoom: 6
          });
          new google.maps.Marker({
            position: { lat: this.latitude, lng: this.longitude },
            map,
          });
          const atms = res.venues.slice(0, 100);
          atms.forEach(atm => {
            new google.maps.Marker({
              position: { lat: atm.lat, lng: atm.lon },
              map,
              label: atm.name,
              icon: this.atmIcon
            });
          })
        })
      })
    })


  }
  setLocation(): Observable<boolean> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
      });
      return of(true);
    } else {
      return of(true);
    }

  }


}
