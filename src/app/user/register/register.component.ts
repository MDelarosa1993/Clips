import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../shared/input/input.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  private auth = inject(Auth);
  inSubmission = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: [18, [Validators.required, Validators.min(18), Validators.max(120)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
      ],
    ],
    confirmPassword: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(13), Validators.maxLength(13)],
    ],
  });

  showAlert = signal(false);
  alertMsg = signal('Please wait! Your account is being created.');
  alertColor = signal('blue');

  async register() {
    this.showAlert.set(true);
    this.alertMsg.set('Please wait! Your account is being created.');
    this.alertColor.set('blue');
    this.inSubmission.set(true);
    const { email, password } = this.form.getRawValue();
    try {
      const userCred = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(userCred);
    } catch (error) {
      console.log(error);
      this.alertMsg.set('An unexpected error occured! Please try again later!');
      this.alertColor.set('red');
      this.inSubmission.set(false);
      return;
    }
    this.alertMsg.set('Success! Your account has been created');
    this.alertColor.set('green');
  }
}
