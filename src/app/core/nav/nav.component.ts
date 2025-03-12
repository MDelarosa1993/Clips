import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Auth, signOut } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  modal = inject(ModalService);
  auth = inject(AuthService);
  authFB = inject(Auth);

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggle('auth');
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this.authFB);
  }
}
