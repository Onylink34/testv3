import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//PROVIDERS
import { Dateformat } from '../../providers/dateformat';
import { LocationTracker } from '../../providers/location-tracker';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  remplir;
  idsession = "";
  id_phone = "";

  constructor(
    private sqlite: SQLite,
    public dateFormat: Dateformat,
    public locationTracker: LocationTracker,
    public authService:AuthService) {

    }

    ionViewDidLoad(){
      //console.log('ionViewDidLoad LOAD About Test');
      this.locationTracker.startTracking();
      this.startsession();
    }
    ionViewDidEnter() {
      // console.log('ionViewDidEnter ENTER About Test');
      // this.locationTracker.startTracking();
    }
    ionViewWillLeave(){
      // console.log('ionViewWillLeave BYE About Test');
      // this.locationTracker.stopTracking();
    }

    startsession(){
      if (this.idsession != "") {

      } else {
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
      this.idsession = "";
      this.authService.setidession("");
    }

    updateSession(id){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        let ids = id;
        let end = this.dateFormat.gettime();
        this.remplir = "update A : " + ids;

        db.executeSql('CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT,id_phone,score,start,end,date,globalGPS)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql('UPDATE session SET end = ? WHERE id = ?', [end,ids])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(JSON.stringify(e)));
    }


    computeScore(){
      this.updateSession(this.idsession);
      this.endsession();
    }





    addvalue(apexvalue){
      if (this.idsession != "") {
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
        this.remplir = "add " + this.idsession;
      } else {
        this.startsession();
      }
    }

  }
