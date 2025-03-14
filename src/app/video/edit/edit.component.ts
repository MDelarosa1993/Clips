import { Component, input } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Clip } from '../../interfaces/clip';
@Component({
  selector: 'app-edit',
  imports: [ModalComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  activeClip = input<Clip | null>(null);
}
