import { Component, signal } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective, NgClass],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  isDragover = signal(false);

  storeFile($event: Event) {
    this.isDragover.set(false);
  }
}
