import { Injectable, signal } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

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

  async getScreenshots(file: File | null) {
    if (!file) {
      return [];
    }
    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);
    await this.ffmpeg.run(
      "-i", file.name,
      "-ss", "00:00:1",
      "-frames:v", "1",
      "-filter:v", 
      'scale=510:-1',
      'output_01.png'
    );
    return [];
  }
}
