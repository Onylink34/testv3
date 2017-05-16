import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  idphone="";
  uuid="";
  idsession="";

  constructor() {

    }

    getidphone(){
      if(this.idphone != "") {return this.idphone;}
    }

    setidphone(id_phone){
      this.idphone = id_phone;
    }

    setuuid(id_uuid){
      this.uuid = id_uuid;
    }

    getuuid(){
      if(this.uuid != "") {return this.uuid;}
    }

    setidession(id_s){
      this.idsession = id_s;
    }
    getidsession(){
      return this.idsession;
    }

  }
