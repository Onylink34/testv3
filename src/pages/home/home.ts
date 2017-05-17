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
  idphone="";
  dataList = [];
  uuid="";

  //CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private sqlite: SQLite,
    public device: Device,
    public platform: Platform,
    private alertCtrl: AlertController,
    private authService:AuthService) {

    }

    ionViewDidLoad(){
      console.log("LOAD FUNCTION");
      this.check_uuid();
    }

    ionViewWillEnter(){
      this.dataList = [];
      console.log("ENTER FUNCTION");
      this.check_uuid();
      this.checkdatasession();
    }


    check_uuid(){
      if (this.idphone != "") {

      } else {
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
            if(data.rows.length > 0) {
              this.idphone = data.rows.item(0).id;
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
    }

    checkdatasession(){
      if (this.idphone != "") {
        this.sqlite.create({
          name: 'data.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT,id_phone,score,start,end,date,globalGPS)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));


          db.executeSql('select * from session where id_phone = ? AND end !="" ', [this.idphone]).then((data) => {
            console.log(JSON.stringify(data));
            if(data.rows.length > 0) {
              this.dataList = [];
              for(var i = 0; i < data.rows.length; i++) {
                this.dataList.push({
                  id:data.rows.item(i).id,
                  id_phone: data.rows.item(i).id_phone,
                  start: data.rows.item(i).start,
                  end: data.rows.item(i).end,
                  date: data.rows.item(i).date,
                  score: data.rows.item(i).score
                });
              }
            }
          }).catch(e => console.log(e));;
        })
        .catch(e => console.log(JSON.stringify(e)));
      } else {

      }
    }
    // test(){
    //   this.checkuuid();
    //   this.checkuuid2();
    // }

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



    // checkuuid(){
    //   this.uuid = this.device.uuid;
    //   this.sqlite.create({
    //     name: 'data.db',
    //     location: 'default'
    //   })
    //   .then((db: SQLiteObject) => {
    //     db.executeSql('CREATE TABLE IF NOT EXISTS phone(id INTEGER PRIMARY KEY AUTOINCREMENT,uuid)', {})
    //     .then(() => console.log('Executed SQL'))
    //     .catch(e => console.log(e));
    //
    //     db.executeSql('select * from phone where uuid = ?', [this.uuid]).then((data) => {
    //       console.log(JSON.stringify(data));
    //       if(data.rows.length > 0) {
    //         for(var i = 0; i < data.rows.length; i++) {
    //           this.idphone = data.rows.item(i).id;
    //         }
    //         this.authService.setuuid(this.uuid);
    //         this.authService.setidphone(this.idphone);
    //       }
    //       else{this.adduuid();}
    //     }, (err) => {
    //       console.log('Unable to execute sql: '+JSON.stringify(err));
    //     });
    //   })
    //   .catch(e => console.log(JSON.stringify(e)));
    // }
    //
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
            this.authService.setuuid(this.uuid);
            this.authService.setidphone(this.idphone);
          }
        });
      }).catch(e => console.log(JSON.stringify(e)));
    }
  }
