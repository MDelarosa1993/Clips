import { Injectable, signal } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = signal(false);
  ffmpeg = createFFmpeg({ log: true });
  isRunning = signal(false);

  async init() {
    if (this.isReady()) {
      return;
    }
    await this.ffmpeg.load();
    this.isReady.set(true);
  }

  async getScreenshots(file: File | null) {
    if (!file) {
      return [];
    }

    this.isRunning.set(true);

    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds: number[] = [1, 2, 3];
    const commands: string[] = [];

    seconds.forEach((second) => {
      commands.push(
        '-i',
        file.name,
        '-ss',
        `00:00:${second}`,
        '-frames:v',
        '1',
        '-filter:v',
        'scale=510:-1',
        `output_0${second}.png`
      );
    });
    await this.ffmpeg.run(...commands);

    const screenshots: string[] = [];
    seconds.forEach((second) => {
      const screenshotFile = this.ffmpeg.FS(
        'readFile',
        `output_0${second}.png`
      );
      const screenshotBlob = new Blob([screenshotFile.buffer], {
        type: 'image/png'
      });
      const screenshotURL = URL.createObjectURL(screenshotBlob);
      screenshots.push(screenshotURL);
    });
    this.isRunning.set(false);
    return screenshots;
  }

  async blobFromURL(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();

    return blob;
  }
}
