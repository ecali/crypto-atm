import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Observable, of } from 'rxjs';
import { Atm } from 'src/app/model/atm';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() atms!: Atm[];
  spawn = { lat: 40.730610, lng: -73.935242 }
  atmIcon = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';

  constructor() { }

  ngOnInit(): void {
    this.setLocation().subscribe(_ => {
      let loader = new Loader({
        apiKey: environment.apikey,
      })
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById('map')!, {
          center: this.spawn,
          zoom: 6
        });
        new google.maps.Marker({
          position: this.spawn,
          map,
        });
        if (this.atms.length > 0) {
          this.atms.forEach(atm => {
            new google.maps.Marker({
              position: { lat: atm.lat, lng: atm.lon },
              map,
              label: atm.name,
              icon: this.atmIcon
            });
          })
        }
      })
    })
  }

  setLocation(): Observable<boolean> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.spawn = { lat: position.coords.latitude, lng: position.coords.longitude }
      });
      return of(true);
    } else {
      return of(true);
    }

  }


}
