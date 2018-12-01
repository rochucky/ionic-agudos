import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

/**
 * Generated class for the RedeCredenciadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rede-credenciada',
  templateUrl: 'rede-credenciada.html',
})
export class RedeCredenciadaPage {

  public searchStr = '';

  public items = new Array();

  public sync = {
    'userid': '',
    'token': ''
  }

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider) {
  
    // this.items = [
    //   {
    //     'name': "Estab 1",
    //     'address': "Rua João Jacinto Silva",
    //     'visibility': ''
    //   },
    //   {
    //     'name': "Estab 2",
    //     'address': "Rua Barão Amaral do Cabo Frio, 48",
    //     'visibility': ''
    //   }
    // ]

    this.storage.forEach((value, key) => {
        if(key == 'token'){ this.sync.token = value }
        if(key == 'userid'){ this.sync.userid = value }
      })
      .then(() => {

        let array = {
          method: 'getEstablishments',
          data:{
            userid: this.sync.userid,
            token: this.sync.token
          }
        }

        this.http.postData(array)
          .then((result) => {
            
            result.forEach((val) => {
              this.items.push(val);
            })
          
          },(err) => {
              console.log(err);
              alert('erro');
            
          });
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeCredenciadaPage');
  }

  onInput(evt){
    console.log(this.searchStr);
    this.items.forEach((val, key) => {
      if(val.name.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.address.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else{
        this.items[key].visibility = 'hide';
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
