import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  id;
  long;
  uid;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.id = navParams.get('id');
    let name = navParams.get('name');

    alert(this.id);
// alert(this.device.uuid);
    // this.uid = this.device.uuid;
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.lat = resp.coords.latitude
    //   this.long = resp.coords.longitude
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    //
    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //  // data can be a set of coordinates, or an error (if an error occurred).
    //  // data.coords.latitude
    //  // data.coords.longitude
    // });

  }



}
