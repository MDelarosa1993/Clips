import { Component, inject, input, effect, signal, output } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Clip } from '../../interfaces/clip';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { NgClass } from '@angular/common';
import { ClipService } from '../../services/clip.service';

@Component({
  selector: 'app-edit',
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    InputComponent,
    AlertComponent,
    NgClass,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  activeClip = input<Clip | null>(null);
  fb = inject(FormBuilder);
  inSubmission = signal(false);
  showAlert = signal(false);
  alertColor = signal('blue');
  alertMsg = signal('Please Wait! Updating clip');
  clipService = inject(ClipService);
  update = output<Clip>();

  form = this.fb.nonNullable.group({
    id: [''],
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor() {
    effect(() => {
      this.form.controls.id.setValue(this.activeClip()?.docID ?? '');
      this.form.controls.title.setValue(this.activeClip()?.title ?? '');
    });
  }

  async submit() {
    this.inSubmission.set(true);
    this.showAlert.set(true);
    this.alertColor.set('blue');
    this.alertMsg.set('Please Wait! Updating clip');
    try {
      await this.clipService.upDateClip(
        this.form.controls.id.value,
        this.form.controls.title.value
      );
    } catch (error) {
      this.inSubmission.set(false);
      this.alertColor.set('red');
      this.alertMsg.set('Something went wrong! Try again later.');
      return;
    }
    const updateClip = this.activeClip();

    if(updateClip) {
      updateClip.title = this.form.controls.title.value;
      this.update.emit(updateClip);
    }

    this.inSubmission.set(false);
    this.alertColor.set('green');
    this.alertMsg.set('Success!');
  }
}
