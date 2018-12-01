import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

/**
 * Generated class for the SaldoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html',
})
export class SaldoPage {

  public saldo = {
    avista: 0,
    parcelado: 0,
    debAtual: 0,
    debFuturo: 0
  };

  public establishments = new Array();

  public sync = {
    userid: '',
    token: ''
  };

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider, public toast: ToastController) {
    

      this.storage.forEach((value, key) => {
        if(key == 'token'){ this.sync.token = value }
        if(key == 'userid'){ this.sync.userid = value }
      })
      .then(() => {

        let array = {
          method: 'getBalanceData',
          data:{
            userid: this.sync.userid,
            token: this.sync.token
          }
        }

        this.http.postData(array)
          .then((result) => {
            
            let responseData: any;
            responseData = result;
            if(responseData.error){
              
              let toast = this.toast.create({
                message: responseData.message,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();

            }

            else{
              this.saldo.avista = responseData.avista;
              this.saldo.parcelado = responseData.parcelado;
              this.saldo.debAtual = responseData.atual;
              this.saldo.debFuturo = responseData.futuro;
              for(let i in responseData.establishment){
                this.establishments.push(responseData.establishment[i]);
              }
              
            }

          },(err) => {
              console.log(err);
              alert('erro');
            
          });
        });
      

     

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaldoPage');
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
