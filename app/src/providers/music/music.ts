import {Injectable} from "@angular/core";
import {SpotifyPlayerProvider} from "../spotify-player/spotify-player";

export interface Audio {
  value: number;
}
@Injectable()
export class MusicProvider {
  albumImage: string;
  musicSource: string;
  deviceWidth: number;
  playModalTitle: string;
  audioProgress: number;
  isPaused: boolean;
  isPlaylist: boolean;
  isIOS: boolean;
  isMuted: boolean;
  audioPlayer;
  audio: Audio;
  constructor(
    private spotifyPayer: SpotifyPlayerProvider
  ){}


  togglePlayPause() {
    if(this.spotifyPayer.isPaused) {
      this.spotifyPayer.play()
    }
  }

  playNext() {

  }

  playPrevious() {

  }

  toggleMute() {

  }

  seekTo() {

  }

  isFirstSong() {

  }

  isLastSong() {

  }


}
