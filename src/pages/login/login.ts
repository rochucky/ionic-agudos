import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginEPage } from '../login-e/login-e';

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

	responseData: any;

  login = {
  	cpf: '',
  	password: ''
  };

  constructor(public navCtrl: NavController,public navParams: NavParams, public http: AuthServiceProvider) {
  	
  }

  forgot() {
  	alert('ok');
  }

  logon(){
  	let data = {
  		username: this.login.cpf,
  		password: this.login.password,
  		usertype: 'users'
  	}

  	this.http.postData(data)
  		.then((result) => {
  			alert(result.response);
	  	},(err) => {
	  			console.log(err);
	  			alert('erro');
	  		
  		});
  }



  changeType() {
  	this.navCtrl.setRoot(LoginEPage);
  }

}
