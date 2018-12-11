import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

/**
 * Generated class for the TransacoesEPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transacoes-e',
  templateUrl: 'transacoes-e.html',
})
export class TransacoesEPage {

  public searchStr = '';

  public items = new Array();

  public sync = {
    'userid': '',
    'token': ''
  }

  public refreshEvent: any;

  loadData(){
    this.storage.forEach((value, key) => {
        if(key == 'token'){ this.sync.token = value }
        if(key == 'userid'){ this.sync.userid = value }
      })
      .then(() => {

        let array = {
          method: 'getEstablishmentTransactions',
          data:{
            userid: this.sync.userid,
            token: this.sync.token
          }
        }

        this.http.postData(array)
          .then((result) => {

            let responseData: any;
            responseData = result;

            if(responseData.error == true){
              let toast = this.toastCtrl.create({
                message: responseData.message,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
            else{
              this.items.splice(0, this.items.length);
              responseData.forEach((val) => {
              this.items.push(val);
            });

            }

            if(this.refreshEvent != undefined){
              this.refreshEvent.complete();
            }
          
          },(err) => {
              console.log(err);
              let toast = this.toastCtrl.create({
                message: "Erro ao buscar os dados.",
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              if(this.refreshEvent != undefined){
                this.refreshEvent.complete();
              }
            
          });
      });
  }

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider, public toastCtrl: ToastController) {
  
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransacoesPage');
  }

  onInput(evt){
    console.log(this.searchStr);
    this.items.forEach((val, key) => {
      if(val.name.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.value.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.date.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.type.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else{
        this.items[key].visibility = 'hide';
      }
    });
  }

  doRefresh(evt){

    this.refreshEvent = evt;

    this.loadData();


  }

  cancelTransaction(code){
    let data = {
      table: 'transactions',
      filter: "code|"+code,
      data: {
        status: 2,
        id: "custom"
      },
      method: "saveData"
    };

    let confirm = this.alertCtrl.create({
      title: 'Cancelar Transação',
      subTitle: 'Deseja realmente Cancelar esta transação?<br>Se for uma compra parcelada, cancelará todos os lançamentos.',
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
              content: 'Cancelando'
            });

            loading.present();

            this.http.postData(data)
              .then((result) => {

                if(result[1] == null){
                  let toast = this.toastCtrl.create({
                    message: "Transação cancelada",
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  loading.dismiss();
                  this.loadData();
                }

              },(err) => {

                console.log(err);
                alert('error');

              });
          }
        }
      ]
    });
    confirm.present();
    
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
