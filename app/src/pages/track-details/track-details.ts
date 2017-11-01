import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Http, RequestOptions, Headers} from "@angular/http";
declare var cordova;

/**
 * Generated class for the TrackDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-track-details',
  templateUrl: 'track-details.html',
})
export class TrackDetailsPage implements OnInit {
  track: any;
  src ='';
  free = true;
  trackURI: string;
  ngOnInit(): void {

    this.track = this.navParams.get('track');
    this.storage.ready().then(() => {
      this.storage.get('token').then((token) => {
        let headers: Headers = new Headers();
        headers.set('Authorization', 'Bearer ' + token);
        let options: RequestOptions = new RequestOptions({ headers });
        this.http.get('https://api.spotify.com/v1/me', options).subscribe((me) => {
          let user = me.json();
          console.log(user);
          this.trackURI = `https://open.spotify.com/embed?uri=spotify:track:${this.track.uri}`;
          console.log(this.trackURI);
          if (user.product === 'open') {
            if (this.track.preview_url) {
              this.src = this.track.preview_url;
              this.free = true;
            }
          } else {
            this.free = false;
            cordova.plugins.spotify.play(this.track.uri, {
              clientId: '1141cb8f9e66467d8cf514b799a3773e',
              token
            });
          }

          // cordova.plugins.spotify.play(this.track.uri, {
          //   clientId: '1141cb8f9e66467d8cf514b799a3773e',
          //   token
          // });

        });

      });
    });

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackDetailsPage');
  }

}
