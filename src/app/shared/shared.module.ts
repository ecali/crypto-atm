import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    CardListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CardListComponent
  ]
})
export class SharedModule { }
