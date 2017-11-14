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
  previewUrl;
  accountType;
  audioPlayer: HTMLAudioElement;
  isPlaying = false;
  isPaused = false;
  currentPosition = 0;
  tappedPosition = 0;
  durationS = 0;
  progress;
  spotify = cordova.plugins.spotify;
  constructor(public http: Http, private storage: Storage) {
  }

  setTrack(track, audioPlayer?) {
    console.log(track);
    this.track = track;
    // TODO: check number of digits
    this.durationS = this.track.duration_ms / 10000;
    this.trackURI = this.track ? this.track.uri : '';

    if (audioPlayer) {
      console.log(audioPlayer);
      this.audioPlayer = audioPlayer.nativeElement;
      this.durationS = 30;
      console.log(this.durationS);
      this.previewUrl = track.preview_url !== "" ? track.preview_url : null;
      console.log('preview url', this.previewUrl);
    }

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
    if (this.accountType === 'premium') {
      this.storage.get('token').then((token) => {
        this.spotify.play(this.trackURI, {
          clientId: SPOTIFY_CLIENT_ID,
          token
        }).then(() => {
          this.isPlaying = true;
          this.getTrackPosition();
        });
      });
    } else {
      if (this.previewUrl && this.audioPlayer) {
        console.log('preview present');
          this.audioPlayer.play();
          this.initAudioPlayerEvents();
          this.isPlaying = true;
      }

    }
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
    if (this.accountType === 'premium') {
      this.spotify.pause().then(() => {
        this.isPaused = true;
      });
    } else {
      this.audioPlayer.pause();
      this.isPlaying = false;
    }

  }

  seekTo(progress) {
    // console.log(progress);
    // console.log('current position', this.currentPosition);
    // console.log('progress value', progress.value);
    // console.log('tapped position', this.tappedPosition);
    if (this.currentPosition != this.tappedPosition) {
      console.log('seek track', this.currentPosition);
      // TODO: check if can play through
      if (this.accountType === 'premium') {
        this.spotify.seekTo(this.currentPosition);
      } else {
        this.audioPlayer.currentTime = this.currentPosition;
      }

    }

  }

  resume() {
    this.spotify.resume().then(() => {
      this.isPaused = false;
    });
  }

  initAudioPlayerEvents() {
    this.audioPlayer.ontimeupdate = () => {
      this.tappedPosition = this.currentPosition = this.audioPlayer.currentTime;
    };

    this.audioPlayer.onended = () => {
      this.isPlaying = false;
    };
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
