import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';

@Injectable()
export class Dateformat {

  constructor() {

  }

  gettime() {
    var myDate = new Date();
    var datePipe = new DatePipe('fr-FR');
    return datePipe.transform(myDate, 'HH:mm:ss');
  }

  getdate() {
    var myDate = new Date();
    var datePipe = new DatePipe('fr-FR');
    return datePipe.transform(myDate, 'yyyyMMdd');
  }
}
