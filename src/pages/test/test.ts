import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AboutPage} from '../about/about';


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

aboutPage = AboutPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  pushPage(){
    // this.navCtrl.push(AboutPage).then(() => {
    //                 const index = this.navCtrl.getActive().index;
    //                 this.navCtrl.remove(index);
    //               });
    this.navCtrl.setRoot(AboutPage,{
            id: "Nic",
            name: "Raboy"
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Test');
  }

}
