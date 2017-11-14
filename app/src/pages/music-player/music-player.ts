import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MusicProvider} from "../../providers/music/music";
import {SpotifyPlayerProvider} from "../../providers/spotify-player/spotify-player";

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage implements OnInit {
  track;
  profile;
  @ViewChild('audioPlayer') audioPlayer: ElementRef;

  constructor(
    private musicservice: MusicProvider,
    private spotifyPlayer: SpotifyPlayerProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit(): void {

  }

  ionViewWillEnter() {
    console.log('will enter');
    this.track = this.navParams.get('track');
    this.profile = this.navParams.get('profile');
    let audioPlayer = this.profile.product !== 'premium' ? this.audioPlayer : null;
    this.spotifyPlayer.setTrack(this.track, audioPlayer);
  }

  ionViewWillLeave() {
    this.spotifyPlayer.resetPlayer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPlayerPage');
  }

}
