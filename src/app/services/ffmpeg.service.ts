import { Injectable, signal } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = signal(false);
  ffmpeg = createFFmpeg({ log: true });

  async init() {
    if(this.isReady()) {
      return;
    }
    await this.ffmpeg.load();
    this.isReady.set(true);
  }
}
