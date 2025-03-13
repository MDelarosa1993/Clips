import { Component, signal, inject } from '@angular/core';
import { EventBlockerDirective } from '../../shared/directives/event-blocker.directive';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { v4 as uuid } from 'uuid'

@Component({
  selector: 'app-upload',
  imports: [EventBlockerDirective, NgClass, ReactiveFormsModule, InputComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  isDragover = signal(false);
  file = signal<File | null>(null);
  nextStep = signal(false);
  fb = inject(FormBuilder);
  private storage = inject(Storage);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  storeFile($event: Event) {
    this.isDragover.set(false);
    this.file.set(($event as DragEvent).dataTransfer?.files.item(0) ?? null);
    if (this.file()?.type !== 'video/mp4') return;
    this.form.controls.title.setValue(
      this.file()?.name.replace(/\.[^/.]+$/, '') ?? ''
    );
    this.nextStep.set(true);
    console.log(this.file());
  }

  uploadFile() {
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`
    const clipRef = ref(this.storage, clipPath)
    uploadBytesResumable(clipRef, this.file() as File)
  }
}
