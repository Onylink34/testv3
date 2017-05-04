import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Gps } from './gps';

@NgModule({
  declarations: [
    Gps,
  ],
  imports: [
    IonicPageModule.forChild(Gps),
  ],
  exports: [
    Gps
  ]
})
export class GpsModule {}
