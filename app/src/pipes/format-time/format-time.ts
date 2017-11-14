import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    let minutes:any = Math.floor(value / 60);
    let seconds:any = Math.floor(value - minutes * 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  }
}
