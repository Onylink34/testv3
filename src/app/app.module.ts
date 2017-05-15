import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//PAGES
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Gps } from '../pages/gps/gps';
import { Test } from '../pages/test/test';

//IONIC NATIVE PLUGINS
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Device } from '@ionic-native/device';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

//ANGULAR PLUINGS
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

//PROVIDERS
import { Dateformat } from '../providers/dateformat';
import { AuthService } from '../providers/auth-service';
import { LocationTracker } from '../providers/location-tracker';

//COMPONENTS
import { Checkfunction } from '../components/checkfunction/checkfunction';

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
    Network,
    SplashScreen,
    Geolocation,
    BackgroundGeolocation,
    Device,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Dateformat,
    LocationTracker,
    AuthService
  ]
})
export class AppModule {}
