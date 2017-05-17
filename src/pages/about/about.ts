import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';

//PAGES
//import {HomePage} from '../home/home'; 

//PROVIDERS
import { Dateformat } from '../../providers/dateformat';
import { LocationTracker } from '../../providers/location-tracker';
import { AuthService } from '../../providers/auth-service';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  remplir;
  idsession = "";
  id_phone = "";
  score;
  buttonClicked: boolean = false;

  p_array;
  r_array;
  c_array;

  constructor(
    private sqlite: SQLite,
    public dateFormat: Dateformat,
    private alertCtrl: AlertController,
    public locationTracker: LocationTracker,
    public authService:AuthService,
    public navCtrl:NavController) {

    }

    ionViewDidLoad(){
      //console.log('ionViewDidLoad LOAD About Test');
      this.locationTracker.startTracking();

    }
    ionViewDidEnter() {
      this.startsession();
      this.id_phone = this.authService.getidphone();
      // console.log('ionViewDidEnter ENTER About Test');
      // this.locationTracker.startTracking();
    }

    ionViewWillLeave(){
      // console.log('ionViewWillLeave BYE About Test');
      //this.stopsesion();
      this.locationTracker.stopTracking();
    }

    startsession(){
      if (this.idsession != "") {
        this.remplir = "continue " + this.idsession;
      } else {
        this.p_array = 0;
        this.r_array = 0;
        this.c_array = 0;
        this.buttonClicked = true;
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT,id_phone,score,start,end,date,globalGPS)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

          this.id_phone = this.authService.getidphone();
          let start = this.dateFormat.gettime();
          let end = "";
          let score = "";
          let date = this.dateFormat.getdate();
          let globalGPS = "";

          db.executeSql('INSERT INTO session(id_phone,score,start,end,date,globalGPS) VALUES(?,?,?,?,?,?)', [this.id_phone,score,start,end,date,globalGPS])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

          db.executeSql('SELECT * FROM session ORDER BY id DESC LIMIT 1', {}).then((data) => {
            console.log(JSON.stringify(data));
            if(data.rows.length > 0) {
              this.idsession = data.rows.item(0).id;
              this.authService.setidession(this.idsession);
              this.remplir = "start " + this.idsession;
            }
          }).catch(e => console.log(e));;
        })
        .catch(e => console.log(JSON.stringify(e)));
      }
    }

    endsession(){
      this.p_array = 0;
      this.r_array = 0;
      this.c_array = 0;
      this.idsession = "";
      this.authService.setidession("");
    }

    updateSession(id, score){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        let ids = id;
        let end = this.dateFormat.gettime();
        this.remplir = "update : " + score;

        db.executeSql('CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT,id_phone,score,start,end,date,globalGPS)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql('UPDATE session SET end = ?, score = ? WHERE id = ?', [end,score,ids])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(JSON.stringify(e)));
    }


    stopsesion(){
      let score =  this.computeScore();
      this.updateSession(this.idsession, score);
      this.endsession();
      let alert = this.alertCtrl.create({
        title: 'End Session',
        subTitle: 'Score : '+score,
        buttons: ['Ok']
      });
      alert.present();
      this.buttonClicked = false;
    }

    computeScore():any{
      let totalentity = this.p_array + this.r_array + this.c_array;
      let p_purcent = this.p_array * 100 / totalentity;
      let r_purcent = this.r_array * 100 / totalentity;
      let c_purcent = this.c_array * 100 / totalentity;
      return (100/3)*((1-p_purcent)+(r_purcent)+(2*c_purcent));
    }


    addvalue(apexvalue){
      if (this.idsession != "") {
        if (apexvalue == "P") {
          this.p_array++;
        } else {
          if (apexvalue == "R") {
            this.r_array++;
          } else {
            this.c_array++;
          }
        }

        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS datasession(id INTEGER PRIMARY KEY AUTOINCREMENT,id_session,apex,latitude,longitude,hour)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
          var id_session = this.idsession;
          var apex = apexvalue;
          var latitude = this.locationTracker.getLongitude();
          var longitude = this.locationTracker.getLatitude();
          var hour = this.dateFormat.gettime();
          db.executeSql('INSERT INTO datasession(id_session,apex,latitude,longitude,hour) VALUES(?,?,?,?,?)', [id_session,apex,latitude,longitude,hour])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
        })
        .catch(e => console.log(JSON.stringify(e)));
        this.remplir = "add " + this.idsession + " > "+apexvalue;
      } else {
        this.startsession();
      }
    }

  }
