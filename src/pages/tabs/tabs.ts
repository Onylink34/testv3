import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Gps } from '../gps/gps';
import { Test } from '../test/test';
import { Managebdd } from '../managebdd/managebdd';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = Gps;
  tab5Root = Test;
  tab6Root = Managebdd;

  constructor() {

  }
}
