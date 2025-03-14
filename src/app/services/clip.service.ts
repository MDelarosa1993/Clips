import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Clip } from '../interfaces/clip';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  #firestore = inject(Firestore);
  #clipsCollection = collection(this.#firestore, 'clips');
  #auth = inject(Auth);

  constructor() { }

  async createClip(data: Clip) {
    return await addDoc(this.#clipsCollection, data);
  }

  async getUserClips() {
    const q = query(this.#clipsCollection, where('uid', '==', this.#auth.currentUser?.uid));
    return await getDocs(q);
  }
}
