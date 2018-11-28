import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from '../login/login';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-e',
  templateUrl: 'login-e.html',
})
export class LoginEPage {

  login = {
    cnpj: '',
    password: ''
  };

  constructor(public navCtrl: NavController,public navParams: NavParams, public http: AuthServiceProvider) {
  	
  }

  forgot() {
  	alert('ok');
  }

  logon(){
  	let data = {
      username: this.login.cnpj,
      password: this.login.password,
      usertype: 'estabelecimento',
      method: 'logon'
    }

    this.http.postData(data)
      .then((result) => {
        alert(result);
      },(err) => {
          console.log(err);
          alert('erro');
        
      });
  }

  changeType() {
    this.navCtrl.setRoot(LoginPage);
  }

}
