import { Injectable, signal } from '@angular/core';
import { IModal } from '../interfaces/imodal';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals = signal<IModal[]>([]);

  constructor() {}

  register(id: string, element: HTMLDialogElement) {
    this.modals.set([
      ...this.modals(),
      {
        id,
        element,
      },
    ]);
  }

  toggle(id: string) {
    const modal = this.modals().find((item) => item.id === id)
    if(!modal) {
      return 
    }
    if(modal.element.open) {
      modal.element.close()
    } else {
      modal.element.showModal()
    }
  }
}
