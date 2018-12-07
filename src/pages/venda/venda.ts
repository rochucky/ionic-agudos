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
  	name: '',
  	code: ''
  }

  public userid: any;

  public first = '';
  public second = 'hide';

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public storage: Storage, public http: AuthServiceProvider, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendaPage');
  }

  toDecimal(){
  	alert('ok');
  }

  next(){
  	if(this.venda.value != '' && this.venda.installments != '' && this.venda.code != ''){
  		let loading = this.loadingCtrl.create({
      	content: 'Carregando'
	    });

	    loading.present();
  		let data = {
	      table: 'users',
	      filter: "code|"+this.venda.code,
	      method: "getRecord"
	    };

	     this.http.postData(data)
	      .then((result) => {

	        let responseData: any;
	        responseData = result;
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
		this.storage.get('userid').then((id) => {
  		this.userid = id;
			let data = {
	      method: "makeSale",
	      	value: this.venda.value,
	      	code: this.venda.code,
	      	password: this.venda.password,
	      	installments: this.venda.installments,
	      	id: this.userid
	    };

	    this.http.postData(data)
	      .then((result) => {

	        let responseData: any;
	        responseData = result;
	        if(responseData.error){
	        	let toast = this.toastCtrl.create({
							message: responseData.message,
							duration: 1500,
							position: 'bottom'
						});
						toast.present();
	        }
	        else{
		        let alert = this.alertCtrl.create({
						  title: 'Sucesso',
						  subTitle: 'Venda realizada com sucesso.',
						  buttons: [
						  	{
						  		text: "Ok",
						  		handler: () => {
						  			this.navCtrl.setRoot(HomePage);
						  		}
						  	}
						  ]
						});
						alert.present();
	        	
	        }

	      },(err) => {

	        console.log(err);
	        alert('error');

	      });
	      loading.dismiss();
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
