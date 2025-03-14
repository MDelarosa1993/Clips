import { Component, inject, input, effect } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Clip } from '../../interfaces/clip';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-edit',
  imports: [ModalComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  activeClip = input<Clip | null>(null);
  fb = inject(FormBuilder);

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
}
