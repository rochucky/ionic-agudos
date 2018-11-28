import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { LoginEPage } from '../login-e/login-e';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = LoginEPage;

  constructor() {

  }
}
