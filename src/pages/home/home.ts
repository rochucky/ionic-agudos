import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { TabsEPage } from '../tabs-e/tabs-e';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage, private loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando'
    });

    loading.present();

    storage.get('token').then((tkn) => {
      loading.dismiss();
      if(tkn){
        storage.get('usertype').then((usertype) => {
          if(usertype == 'users'){
            this.navCtrl.setRoot(TabsPage);
          }
          else{
            this.navCtrl.setRoot(TabsEPage);
          }
        });
      } 
      else{
        this.navCtrl.setRoot(LoginPage);
      }
    });

  }

  logout(){
  	let confirm = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Deseja realmente fazer logout?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Carregando'
            });

            loading.present();

            this.storage.clear().then((tkn) => {
              loading.dismiss();
              this.navCtrl.setRoot(LoginPage);
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
