import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Subscription} from "rxjs/Subscription";
import {Storage} from "@ionic/storage";
declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url: string;
  code: string;
  exit: Subscription;
  secret = '1141cb8f9e66467d8cf514b799a3773e:6468c9dc1d48472a915d3552d0c27a36';
  authorizationCode = 'https://accounts.spotify.com/authorize/?client_id=1141cb8f9e66467d8cf514b799a3773e&response_type=code&redirect_uri=http://localhost/callback&scope=user-read-private%20user-library-read%20streaming&state=34fFs29kd09';

  constructor(public navCtrl: NavController, private iab: InAppBrowser, private http: Http, private storage: Storage) {

  }

  authenticate() {
    this.codeAuthorization();
  }
  //
  getToken(code) {
    this.http.post('https://wt-a2bb2074565f23a306bf71addf50c737-0.run.webtask.io/spotify-webtask', {code}).subscribe((response: Response) => {
      const body = response.json();
      alert('success');
      console.log(body);
      this.storage.ready().then(() => {
        this.storage.set('token', body.access_token);
        this.navCtrl.push('PlaylistPage');
      })
    }, (error) => console.log(error));

  }

  codeAuthorization() {
    const browser = this.iab.create(this.authorizationCode, '_blank', 'location=no,clearsessioncache=yes,clearcache=yes');
    browser.on('loadstart').subscribe((event) => {
      this.url = event.url;
      if (this.url.indexOf('http://localhost/callback') === 0) {
        this.exit.unsubscribe();
        browser.close();
        var responseParameters = ((event.url).split("?")[1]).split("&");
        var parsedResponse:any = {};
        for (var i = 0; i < responseParameters.length; i++) {
          parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
        }
        if (parsedResponse["code"] !== undefined && parsedResponse["code"] !== null) {
          console.log(parsedResponse["code"]);
          this.getToken(parsedResponse["code"]);
        } else {
          console.log("Problem authenticating with spotify");
        }
      }

    });

    this.exit = browser.on('exit').subscribe((event)=> {

    });
  }
}
