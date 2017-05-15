import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class AuthService {

  idphone="";
  uuid="";
  idsession="";

  constructor(
    public device: Device,
    private sqlite: SQLite,
    private alertCtrl: AlertController) {

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
          }
        }, (err) => {
          console.log('Unable to execute sql: '+JSON.stringify(err));
        });

        if (this.idphone == "") {
          db.executeSql('INSERT INTO phone(uuid) VALUES(?)', [this.uuid])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

          db.executeSql('select * from phone where uuid = ?', [this.uuid]).then((data) => {
            console.log(JSON.stringify(data));
            if(data.rows.length > 0) {
              for(var i = 0; i < data.rows.length; i++) {
                this.idphone = data.rows.item(i).id;
              }
            }
          }, (err) => {
            console.log('Unable to execute sql: '+JSON.stringify(err));
          });
        }
        if (this.idphone == "") {
          let alert = alertCtrl.create({
            title: 'Probleme !',
            buttons: ['OK']
          });
          alert.present();
        }
      })
      .catch(e => console.log(JSON.stringify(e)));
    }


    getidphone(){
      if(this.idphone != "") {return this.idphone;}
    }

    setuuid(){
      this.uuid = this.device.uuid;
    }

    getuuid(){
      if(this.uuid != "") {return this.uuid;}
    }

    setidession(id_s){
      this.idsession = id_s;
    }
    getids(){
      if(this.idsession != "") {return this.idsession;}
    }

  }
