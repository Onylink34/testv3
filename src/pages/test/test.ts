import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AboutPage} from '../about/about';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Device } from '@ionic-native/device';
import { Dateformat } from '../../providers/dateformat';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite,
    public device: Device,
    public dateFormat: Dateformat) {

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

        db.executeSql('select * from usernameListtest', {}).then((data) => {

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


    pushPage(){
      this.navCtrl.setRoot(AboutPage);
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad Test');
    }

  }
