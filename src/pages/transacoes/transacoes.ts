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
  public avista = true;
  public parcelada = true;

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

            if(responseData.error == true){
              let toast = this.toastCtrl.create({
                message: responseData.message,
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }
            else{

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
      if(val.code.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.value.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.date.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else if(val.name.toLowerCase().search(this.searchStr.toLowerCase()) >= 0){
        this.items[key].visibility = '';
      }
      else{
        this.items[key].visibility = 'hide';
      }
      
      if(val.type == 'À Vista' && this.avista != true){
        this.items[key].visibility = 'hide';
      }
      
      if(val.type != 'À Vista' && this.parcelada != true){
        this.items[key].visibility = 'hide';
      }
    });
  }

  teste(){
    alert(this.avista);
  }

  doRefresh(evt){

    this.refreshEvent = evt;
    this.items.splice(0, this.items.length);

    this.loadData();


  }

}
