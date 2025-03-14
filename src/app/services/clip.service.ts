import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Clip } from '../interfaces/clip';
@Injectable({
  providedIn: 'root'
})
export class ClipService {
  #firestore = inject(Firestore);
  #clipsCollection = collection(this.#firestore, 'clips')
  constructor() { }

  async createClip(data: Clip) {
    return await addDoc(this.#clipsCollection, data);
  }
}
