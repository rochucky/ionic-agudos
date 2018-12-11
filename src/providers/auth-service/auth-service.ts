import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
// import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';


// let apiUrl = 'http://104.236.64.246/application/webservice.php';
let apiUrl = 'http://localhost/application/webservice.php';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  public connectionStatus = true;

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  // private listenConnection(): void {
  //   this.network.onDisconnect()
  //     .subscribe(() => {
  //       this.connectionStatus = false;
  //     });
  //   this.network.onConnect()
  //     .subscribe(() => {
  //       this.connectionStatus = true;
  //     });
  // }

  postData(credentials) {
		return new Promise((resolve, reject) => {
			// this.listenConnection();

		  if(this.connectionStatus == true){
			  let headers = new Headers();
			  headers.append('Content-Type', 'application/json');

			  credentials.source = "mobile";

			  this.http.post(apiUrl, {credentials}, {headers: headers})
			    .subscribe(res => {
			      resolve(res.json());
			    }, (err) => {
			      reject(err);
			    });
		  	
		  }
		  else{
		  	let response = {
		  		error: true,
		  		message: "Não há conexão com a internet"
		  	}
		  	return response;
		  }
		});
  }
}
