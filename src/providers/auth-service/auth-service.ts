import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';


let apiUrl = 'http://104.236.64.246/application/webservice.php';
// let apiUrl = 'http://localhost/application/webservice.php';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  public connectionStatus = true;

  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials) {
		return new Promise((resolve, reject) => {
			// this.listenConnection();
			let loading = this.loadingCtrl.create({
	      content: 'Carregando'
	    });
		  loading.present();

		  let headers = new Headers();
		  headers.append('Content-Type', 'application/json');

		  credentials.source = "mobile";

		  this.http.post(apiUrl, {credentials}, {headers: headers})
		    .subscribe(res => {
		    	loading.dismiss();
		      resolve(res.json());
		    }, (err) => {
		    	loading.dismiss();
		      reject(err);
		    });

		});
  }
}
