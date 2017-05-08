import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http} from '@angular/http'


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
    http: Http
  ) {
    this.http = http;
  }
  http;
  valueserve : string;
  lat : number;
  long : number;
  apex:string;

  sendValues(apexvalue): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

      var link = 'http://gbrunel.fr/ionic/api2.php';
      var data = JSON.stringify({username: this.lat});
      this.http.post(link, data)
      .subscribe(data => {
        this.valueserve = data._body;
      }, error => {
        console.log("Oooops!");
      });
    });

  }

  func1(apexvalue){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.apex = apexvalue;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Gps');
  }

}
