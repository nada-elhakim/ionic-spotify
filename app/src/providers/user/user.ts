import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/concatMap';
import {SPOTIFY_PROFILE_ENDPOINT} from "../../utils/config";
import {Storage} from "@ionic/storage";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http, private storage: Storage) {
    console.log('Hello UserProvider Provider');
  }

  setAuthorizationHeader(token) {
    let headers: Headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
    let options: RequestOptions = new RequestOptions({ headers });
    return options;
  }

  getSpotifyProfile() {
    return Observable
      .fromPromise(this.storage.get('token'))
      .concatMap((token) => {
      return this.http.get(SPOTIFY_PROFILE_ENDPOINT, this.setAuthorizationHeader(token)).map(profile => profile.json());
    });
  }

  saveSpotifyProfile(profile) {
    return new Observable((observer) => {
      this.storage.ready().then(() => {
        this.storage.set('spotify_profile', profile).then(() => {
          observer.next(profile);
          observer.complete();
        });
      },(error) => {
        observer.error(error);
      })
    })
  }

}
