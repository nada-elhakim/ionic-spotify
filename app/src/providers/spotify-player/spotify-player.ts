import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SPOTIFY_CLIENT_ID} from "../../utils/config";
import {Storage} from "@ionic/storage";
declare var cordova;

/*
  Generated class for the SpotifyPlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

 shawn.sridhar@gmail.com   /    !upwork
*/
@Injectable()
export class SpotifyPlayerProvider {
  track;
  trackURI;
  isPlaying = false;
  isPaused = false;
  currentPosition = 0;
  durationS = 0;
  progress;
  spotify = cordova.plugins.spotify;
  constructor(public http: Http, private storage: Storage) {

  }

  setTrack(track) {
    console.log(track);
    this.track = track;
    this.durationS = this.track.duration_ms / 1000;
    this.trackURI = this.track ? this.track.uri : '';
  }

  togglePlayPause() {
    console.log('play')
    if (this.isPaused) {
      this.resume();
      return;
    }
    if (!this.isPlaying) {
      this.play();
      return;
    }

    if (!this.isPaused || this.isPlaying) {
      this.pause();
    }

  }

  play() {
    this.storage.get('token').then((token) => {
      this.spotify.play(this.trackURI, {
        clientId: SPOTIFY_CLIENT_ID,
        token
      }).then(() => {
        this.isPlaying = true;
        this.getTrackPosition();
      });
    });
  }

  getTrackPosition() {
    var onProgress = () => {
      this.spotify.getPosition().then((positionMs) => {
        console.log(positionMs);
        this.currentPosition = positionMs/1000;
        if (this.currentPosition === this.track.duration_ms) {
          // TODO: emit an event and clear timeout
          this.resetPlayer();
          return;
        }
        this.progress = setTimeout(onProgress, 1000);
      });
    };
    onProgress();

  }
  pause() {
    console.log('pause');
    this.spotify.pause().then(() => {
      this.isPaused = true;
    });
  }

  seekTo(positionMs) {
    console.log(positionMs);
    this.spotify.seekTo(positionMs);
  }

  resume() {
    this.spotify.resume().then(() => {
      this.isPaused = false;
    });
  }

  resetPlayer() {
    this.spotify.pause().then(() => {
      this.progress && window.clearTimeout(this.progress);
      this.isPlaying = false;
      this.isPaused = false;
      this.currentPosition = 0;
    });
  }

}
