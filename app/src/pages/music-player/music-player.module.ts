import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicPlayerPage } from './music-player';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MusicPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicPlayerPage),
    PipesModule
  ],
})
export class MusicPlayerPageModule {}
