import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

/*
Generated class for the AuthService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  uuid="";
  idsession="";

  constructor(public device: Device) {
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
