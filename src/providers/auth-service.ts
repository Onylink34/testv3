import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Device } from '@ionic-native/device';

@Injectable()
export class AuthService {

  idphone="";
  uuid="";
  idsession="";
  device = new Device;
  sqlite = new SQLite;

  constructor() {

    }

    start(){
      this.checkuuid();
    }

    getidphone(){
      if(this.idphone != "") {return this.idphone;}
      else{this.checkuuid(); return this.idphone;}
    }

    setidphone(id_phone){
      this.idphone = id_phone;
    }

    setuuid(id_uuid){
      this.uuid = id_uuid;
    }

    getuuid(){
      if(this.uuid != "") {return this.uuid;}
      else{this.checkuuid();return this.uuid;}
    }

    setidession(id_s){
      this.idsession = id_s;
    }
    getidsession(){
      return this.idsession;
    }


    checkuuid(){
      if(this.idphone != ""){

      }
      else{
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
                this.idphone = data.rows.item(0).id;
            }
            else{
              this.adduuid();
            }
          });

        })
        .catch(e => console.log(JSON.stringify(e)));
      }
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
          if(data.rows.length > 0) {
              this.idphone = data.rows.item(0).id;
          }
        });
      }).catch(e => console.log(JSON.stringify(e)));
    }
  }
