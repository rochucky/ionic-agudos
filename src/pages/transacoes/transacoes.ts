import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
/**
 * Generated class for the TransacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transacoes',
  templateUrl: 'transacoes.html',
})
export class TransacoesPage {

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransacoesPage');
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

            this.storage.remove('token').then((tkn) => {
              loading.dismiss();
              this.app.getRootNav().setRoot(HomePage);
              
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
