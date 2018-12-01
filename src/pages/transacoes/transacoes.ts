import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
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
          method: 'getUserTransactions',
          data:{
            userid: this.sync.userid,
            token: this.sync.token
          }
        }

        this.http.postData(array)
          .then((result) => {

            let responseData: any;
            responseData = result;
            console.log(responseData);
            responseData.forEach((val) => {
              this.items.push(val);
            })

            if(this.refreshEvent != undefined){
              this.refreshEvent.complete();
            }
          
          },(err) => {
              console.log(err);
              alert('erro');
            
          });
      });
  }

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider) {
  
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransacoesPage');
  }

  onInput(evt){
    console.log(this.searchStr);
    this.items.forEach((val, key) => {
      console.log(val);
      console.log(this.searchStr);
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
    this.items.splice(0, this.items.length);

    this.loadData();


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
