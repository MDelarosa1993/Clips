import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: [''],
    age: [18],
    password: [''],
    confirmPassword: [''],
    phoneNumber: [''],
  });
}
