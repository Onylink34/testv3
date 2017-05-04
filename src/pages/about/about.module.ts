import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
  ],
  exports: [
    AboutPage,
    Geolocation
  ]
})
export class GpsModule {}
