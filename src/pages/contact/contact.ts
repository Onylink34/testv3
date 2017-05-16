import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http} from '@angular/http';
//import { DatePipe } from '@angular/common';
import { Dateformat } from '../../providers/dateformat';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, http: Http, public dateFormat: Dateformat,public authService:AuthService) {
    this.http = http;
  }
  http;
  response:string;
  str:string;
  remplir:string;
  myDate;

  dataListTemps = [];
  setDob;

  checkuuid2(){
    this.dataListTemps.push({
      id: this.authService.getidphone(),
      uuid: this.authService.getuuid()
      });
  }

  getimealert():void{
    alert( this.dateFormat.gettime());
    alert( this.dateFormat.getdate());
  }


  sendValues(): void {
    var link = 'http://gbrunel.fr/ionic/api2.php';
    var data = JSON.stringify({username: this.str});
    this.http.post(link, data)
    .subscribe(data => {
      this.response = data._body;
    }, error => {
        console.log("Oooops!");
    });

    console.log(this.str);
    this.remplir = this.str;
  }



  addTodo(title:string) {
    console.log(title);
  }
}
