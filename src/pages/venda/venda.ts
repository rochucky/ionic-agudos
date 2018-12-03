import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

/**
 * Generated class for the VendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {

  public venda = {
  	value: '',
  	installments: '',
  	cpf: '',
  	password: '',
  	name: ''
  }

  public first = '';
  public second = 'hide';

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendaPage');
  }

  next(){
  	if(this.venda.value != '' && this.venda.installments != '' && this.venda.cpf != ''){
  		let loading = this.loadingCtrl.create({
      	content: 'Carregando'
	    });

	    loading.present();
  		let data = {
	      table: 'users',
	      filter: "cpf|"+this.venda.cpf,
	      method: "getRecord"
	    };

	     this.http.postData(data)
	      .then((result) => {

	        let responseData = result;
	        if(responseData.error == true){
	        	let toast = this.toastCtrl.create({
							message: responseData.message,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();
	        }
	        else{
		        this.first = 'hide';
	  				this.second = '';
	        	this.venda.name = responseData.name;
	        }

	      },(err) => {

	        console.log(err);
	        alert('error');

	      });
	      loading.dismiss();
  	}
  	else{
			let toast = this.toastCtrl.create({
				message: "Todos os campos são obrigatórios",
				duration: 1500,
				position: 'bottom'
			});
			toast.present();
  	}
  }

  back(){
  	this.venda.password = '';
  	this.first =  '';
  	this.second = 'hide';
  }

  finish(){
  	let loading = this.loadingCtrl.create({
      	content: 'Carregando'
	    });

	    loading.present();
  		let data = {
	      method: "makeSale",
	      data: {
	      	value: this.venda.value,
	      	cpf: this.venda.cpf,
	      	password: this.venda.password,
	      	installments: this.venda.installments
	      }
	    };

	     this.http.postData(data)
	      .then((result) => {

	        let responseData = result;
	        if(responseData.error){
	        	let toast = this.toastCtrl.create({
							message: responseData.message,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();
	        }
	        else{
		        
	        	
	        }

	      },(err) => {

	        console.log(err);
	        alert('error');

	      });
	      loading.dismiss();
  }

}
