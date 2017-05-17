import { Directive } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthService } from '../../providers/auth-service';
import { Device } from '@ionic-native/device';


/**
* Generated class for the Checkfunction directive.
*
* See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
* for more info on Angular Directives.
*/
@Directive({
  selector: '[checkfunction]' // Attribute selector
})
export class Checkfunction {


  constructor(
      private sqlite: SQLite,
      public device: Device,
      private alertCtrl: AlertController,
      public authService:AuthService) {
    console.log('Hello Checkfunction Directive');

  }

  ngOnInit(){
    this.checkuuid();
    let alert = this.alertCtrl.create({
           title: 'Example',
           subTitle: 'Example subtitle',
           buttons: ['OK']
       });
       alert.present();
  }

  checkuuid(){
    var uuid = this.device.uuid;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS phone(id INTEGER PRIMARY KEY AUTOINCREMENT,uuid)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

      db.executeSql('select * from phone where uuid = ?', [uuid]).then((data) => {
        console.log(JSON.stringify(data));
        if(data.rows.length > 0) {
          var idphone = data.rows.item(0).id;
          this.authService.setuuid(uuid);
          this.authService.setidphone(idphone);
        }
        else{this.adduuid();}
      }, (err) => {
        console.log('Unable to execute sql: '+JSON.stringify(err));
      });
    })
    .catch(e => console.log(JSON.stringify(e)));
  }

  adduuid(){
    var uuid = this.device.uuid;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS phone(id INTEGER PRIMARY KEY AUTOINCREMENT,uuid)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

      db.executeSql('INSERT INTO phone(uuid) VALUES(?)', [uuid])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

      db.executeSql('select * from phone where uuid = ?', [uuid]).then((data) => {
        if(data.rows.length > 0) {
          var idphone = data.rows.item(0).id;
          this.authService.setuuid(uuid);
          this.authService.setidphone(idphone);
        }
      });
    }).catch(e => console.log(JSON.stringify(e)));
  }

}
