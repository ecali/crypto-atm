import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() image!: string;
  @Input() icon!: string;
  @Output() clickEmitter = new EventEmitter<string>();



  constructor() { }

  ngOnInit(): void {

  }

}
