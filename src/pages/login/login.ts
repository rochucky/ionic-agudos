import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginEPage } from '../login-e/login-e';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
  	cpf: '',
  	password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: AuthServiceProvider, public toast: ToastController, public storage: Storage, private loadingCtrl: LoadingController) {
    
  }

  forgot() {
  	alert('ok');
  }

  logon(){
  	let array = {
      method: 'login',
      data:{
    		username: this.login.cpf,
    		password: this.login.password,
    		usertype: 'users'
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

          this.storage.set('token', responseData.token);
          this.storage.set('userid', responseData.userid);
          this.storage.set('usertype', responseData.userype);

          let toast = this.toast.create({
            message: "Bem vindo, " + responseData.name,
            duration: 1500,
            position: 'bottom'
          });
          toast.present();

          this.navCtrl.push(TabsPage);
        }

	  	},(err) => {
	  			console.log(err);
	  			alert('erro');
	  		
  		});
  }



  changeType() {
  	this.navCtrl.setRoot(LoginEPage);
  }

}
