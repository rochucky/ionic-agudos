import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage, private loadingCtrl: LoadingController) {

  }

  logout(){
  	
  	let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    this.storage.remove('token').then((tkn) => {
      loading.dismiss();
      this.navCtrl.setRoot(LoginPage);
    });

  }

}
