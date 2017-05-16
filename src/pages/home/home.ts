import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthService } from '../../providers/auth-service';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  //VARIABLES
  dataListSession = [];
  idphone;
  dataListTemps = [];
  uuid;

  //CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public device: Device,
    public platform: Platform,
    private alertCtrl: AlertController,
    public authService:AuthService) {

    }

    ionViewDidLoad(){
      this.checkuuid();
    }


    test(){
      this.checkuuid();
      this.checkuuid2();
    }

    deletetable(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('DROP TABLE phone', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(JSON.stringify(e)));
    }

    deletesql(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE from phone', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
      })
      .catch(e => console.log(JSON.stringify(e)));
    }

    // FUNCTIONS
    checkuuid2(){
      this.dataListTemps.push({
        id: this.authService.getidphone(),
        uuid: this.authService.getuuid()
      });
    }

    checkuuid(){
      this.uuid = this.device.uuid;
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS phone(id INTEGER PRIMARY KEY AUTOINCREMENT,uuid)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql('select * from phone where uuid = ?', [this.uuid]).then((data) => {
          console.log(JSON.stringify(data));
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              this.idphone = data.rows.item(i).id;
            }
            this.authService.setuuid(this.uuid);
            this.authService.setidphone(this.idphone);
          }
          else{this.adduuid();}
        }, (err) => {
          console.log('Unable to execute sql: '+JSON.stringify(err));
        });
      })
      .catch(e => console.log(JSON.stringify(e)));
    }

    adduuid(){
      this.uuid = this.device.uuid;
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS phone(id INTEGER PRIMARY KEY AUTOINCREMENT,uuid)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql('INSERT INTO phone(uuid) VALUES(?)', [this.uuid])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));

        db.executeSql('select * from phone where uuid = ?', [this.uuid]).then((data) => {
          console.log(JSON.stringify(data));
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              this.idphone = data.rows.item(i).id;
            }
            this.authService.setuuid(this.uuid);
            this.authService.setidphone(this.idphone);
          }
        }, (err) => {
          console.log('Unable to execute sql: '+JSON.stringify(err));
        });
      })
      .catch(e => console.log(JSON.stringify(e)));
    }
  }
