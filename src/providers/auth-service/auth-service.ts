import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
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

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials) {
	return new Promise((resolve, reject) => {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');

	  credentials.source = "mobile";

	  this.http.post(apiUrl, {data: credentials}, {headers: headers})
	    .subscribe(res => {
	      resolve(res.json());
	    }, (err) => {
	      reject(err);
	    });
	});
  }
}
