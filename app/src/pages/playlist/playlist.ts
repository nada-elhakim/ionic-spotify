import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Headers, Http, RequestOptions} from "@angular/http";

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage implements OnInit {
  token: string;
  tracks: any = [];
  ngOnInit(): void {
    this.storage.ready().then(() => {
      this.storage.get('token').then((token) => {
        console.log('playlist', token);
        this.token = token;
        this.getMyTracks(token);
      })
    });

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }

  getMyTracks(token) {
    let headers: Headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
    let options: RequestOptions = new RequestOptions({
      headers
    });

    this.http.get('https://api.spotify.com/v1/me/tracks', options).subscribe((tracks) => {
      const body = tracks.json();
      console.log(body);
      this.tracks = body.items;
      console.log(this.tracks);
    });
  }

  goToTrack(track) {
    this.navCtrl.push('MusicPlayerPage', {track});
  }

}
