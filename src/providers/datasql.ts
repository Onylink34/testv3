import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AuthService } from './auth-service';


@Injectable()
export class Datasql {

  idsession:any = "";
  id_phone:any = "";
  dataList = [];

  constructor(private sqlite : SQLite, public authService : AuthService) {
    this.id_phone = this.authService.getidphone();
  }

  get(data){
    if (data === "session") {

    } else {}
  }

  checkdatasession(){
    if (this.id_phone != "") {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS session(id INTEGER PRIMARY KEY AUTOINCREMENT,id_phone,score,start,end,date,globalGPS)', {})
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));


        db.executeSql('select * from session where id_phone = ?', [this.id_phone]).then((data) => {
          console.log(JSON.stringify(data));
          if(data.rows.length > 0) {
            this.dataList = [];
            for(var i = 0; i < data.rows.length; i++) {
              this.dataList.push({
                id_phone: data.rows.item(i).id_phone,
                start: data.rows.item(i).start,
                date: data.rows.item(i).date
              });
            }
          }
        }).catch(e => console.log(e));;
      })
      .catch(e => console.log(JSON.stringify(e)));
    } else {

    }
  }
}
