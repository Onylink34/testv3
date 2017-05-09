import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http} from '@angular/http'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, http: Http) {
    this.http = http;
  }
  http;
  response:string;
  str:string;
  remplir:string;
  myDate;
  setDob;

  getime():void {
    this.myDate = new Date();
    var datePipe = new DatePipe('fr-FR');
    this.setDob = datePipe.transform(this.myDate, 'HH:mm:ss');
    alert(this.setDob);
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
