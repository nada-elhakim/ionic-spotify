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
  track: any;
  profile: any;
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
    this.getNavParams();
    if (this.profile.product === 'premium') this.audioPlayer = null;
    this.spotifyPlayer.setTrack(this.track, this.profile, this.audioPlayer);
  }

  ionViewWillLeave() {
    this.spotifyPlayer.resetPlayer();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusicPlayerPage');
  }

  getNavParams() {
    this.track = this.navParams.get('track');
    this.profile = this.navParams.get('profile');
  }
}
