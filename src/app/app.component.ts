import { Component } from '@angular/core';
import { UtilsMapService } from './services/utils-map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public utilsMapService: UtilsMapService) { }

}
