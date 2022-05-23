import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Atm } from 'src/app/model/atm';
import { VenuesService } from './venues.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {

  atms: Atm[] = [];
  pagedAtms: Atm[] = [];

  length: number = 0;
  pageSize: number = 10; 
  pageSizeOptions: number[] = [5, 10, 15, 20, 50];

  constructor(private venuesService: VenuesService) { }

  ngOnInit(): void {
    this.venuesService.getVenues().subscribe(atms => {
      this.atms = atms;
      this.pagedAtms = this.atms.slice(0, this.pageSize);
      this.length = this.atms.length;
    })
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedAtms = this.atms.slice(startIndex, endIndex);
  }
}
