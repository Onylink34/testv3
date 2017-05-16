import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import {AboutPage} from '../about/about';

import { Network } from '@ionic-native/network';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Device } from '@ionic-native/device';

import { Dateformat } from '../../providers/dateformat';
import { LocationTracker } from '../../providers/location-tracker';


declare var navigator: any;
declare var Connection: any;
/**
* Generated class for the Test page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class Test {
  username='';
  // items = [];
  aboutPage = AboutPage;
  personList = [];
  // public online:boolean=false;
  online;

  tlong;


  constructor(public navCtrl: NavController, private platform: Platform, public navParams: NavParams,
    private sqlite: SQLite,
    public device: Device,
    public dateFormat: Dateformat,
    public network:Network,
    private alertCtrl: AlertController,
    public locationTracker: LocationTracker) {

    }

    ionViewWillLeave(){
      console.log('ionViewWillLeave BYE Test');
    }


    start(){
      this.locationTracker.startTracking();
    }

    stop(){
      this.locationTracker.stopTracking();
    }


    checkNetwork() {
    this.platform.ready().then(() => {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        let alert = this.alertCtrl.create({
            title: "Connection Status",
            subTitle: states[networkState],
            buttons: ["OK"]
        });
        alert.present();
    });
}

    sendValues(apexvalue){
      var time = this.dateFormat.gettime();
      var uuid = this.device.uuid;
      var apex = apexvalue;

      //TEMP
      uuid = "StringASupprimer";

      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {

        //data insert section
        db.executeSql('CREATE TABLE IF NOT EXISTS usernameListtest(id INTEGER PRIMARY KEY AUTOINCREMENT,name,uuid,apex)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        //data insert section
        db.executeSql('INSERT INTO usernameListtest(name,uuid,apex) VALUES(?,?,?)', [time, uuid,apex])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));


        //data retrieve section

        db.executeSql('select * from usernameListtest where apex = ?', ["apex1"]).then((data) => {

          console.log(JSON.stringify(data));

          //alert(data.rows.length);
          //alert(data.rows.item(5).name);
          // this.items = [];
          this.personList = [];
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              //alert(data.rows.item(i).name);
              this.personList.push({
                name: data.rows.item(i).name,
                uuid: data.rows.item(i).uuid,
                apex: data.rows.item(i).apex
              });
              // this.items.push({name: data.rows.item(i).name});
            }
          }

        }, (err) => {
          console.log('Unable to execute sql: '+JSON.stringify(err));
        });
      })
      .catch(e => console.log(JSON.stringify(e)));
      console.log(this.username);

    }

    networkinfo(){

      this.network.onConnect().subscribe(res=>{
        this.online="true";
        console.log(this.online);

      });

      this.network.onDisconnect().subscribe(res=>{
        this.online="false";
        console.log(this.online);
      });
    }

    pushPage(){
      this.navCtrl.setRoot(AboutPage);
    }


    ionViewDidLoad() {
      console.log('ionViewDidLoad Test');
    }

  }
