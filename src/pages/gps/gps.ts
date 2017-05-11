import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http} from '@angular/http';
import { Device } from '@ionic-native/device';
import { Dateformat } from '../../providers/dateformat';




@IonicPage()
@Component({
  selector: 'page-gps',
  templateUrl: 'gps.html',
})
export class Gps {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    http: Http,
    public device: Device,
    public dateFormat: Dateformat
  ) {
    this.http = http;
  }
  http;
  valueserve : string;
  apex : string;

  sendValues(apexvalue): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      var lat : number = resp.coords.latitude;
      var long : number = resp.coords.longitude;

      var key : string = "create";
      var time = this.dateFormat.gettime();
      var link = 'http://gbrunel.fr/ionic/api2.php';
      var uuid = this.device.uuid;
      var data = JSON.stringify({key:key, uuid:uuid, latitude:lat, longitude:long, apex: apexvalue, time:time});

      console.log(data);

      this.http.post(link, data)
      .subscribe(data => {
        this.valueserve = data._body;
      }, error => {
        console.log("Oooops!");
      });
    });

  }

  // func1(apexvalue){
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     this.lat = resp.coords.latitude;
  //     this.long = resp.coords.longitude;
  //     this.apex = apexvalue;
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gps');
  }

}
