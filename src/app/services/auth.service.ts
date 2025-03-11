import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile, authState } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { UserData } from '../interfaces/iuserdata';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  authState$ = authState(this.auth);

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
      displayName: userData.name
    })
    console.log(userCred);
  }
}
