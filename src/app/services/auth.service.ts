import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, authState, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { UserData } from '../interfaces/iuserdata';
import { delay, filter } from 'rxjs'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  authState$ = authState(this.auth);
  authStateWithDelay$ = this.authState$.pipe(delay(1000));
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(console.log);
  }

  async creatUser(userData: UserData) {
    const userCred = await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password
    );
    await setDoc(doc(this.firestore, 'users', userCred.user.uid), {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });
    await updateProfile(userCred.user, {
      displayName: userData.name,
    });
    console.log(userCred);
  }

  async logout($event?: Event) {
    $event?.preventDefault();
    await signOut(this.auth);

    await this.router.navigateByUrl('/');
  }
}
