import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Gps } from '../pages/gps/gps';
import { Test } from '../pages/test/test';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { HttpModule, Http } from '@angular/http';

import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular

//providers maison
import { Dateformat } from '../providers/dateformat'
import { Checkfunction } from '../components/checkfunction/checkfunction'

import {SQLite, SQLiteObject} from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Gps,
    Checkfunction,
    Test
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Gps,
    Test
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Device,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Dateformat
  ]
})
export class AppModule {}
