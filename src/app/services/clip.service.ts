import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Clip } from '../interfaces/clip';
import { Auth } from '@angular/fire/auth';
import { Storage, ref, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  #firestore = inject(Firestore);
  #clipsCollection = collection(this.#firestore, 'clips');
  #auth = inject(Auth);
  storage = inject(Storage);

  constructor() { }

  async createClip(data: Clip) {
    return await addDoc(this.#clipsCollection, data);
  }

  async getUserClips() {
    const q = query(this.#clipsCollection, where('uid', '==', this.#auth.currentUser?.uid));
    return await getDocs(q);
  }

  async upDateClip(id: string, title: string) {
    const clipRef = doc(this.#firestore, 'clips', id)
    return await updateDoc(clipRef, {
      title,
    })
  }

  async deleteClip(clip: Clip) {
    const fileRef = ref(this.storage, `clips/${clip.fileName}`);
    await deleteObject(fileRef);
    const docRef = doc(this.#firestore, 'clips', clip.docID as string);
    await deleteDoc(docRef);
    const screenshotRef = ref(this.storage, `screenshots/${clip.screenshotFilename}`);

    await deleteObject(screenshotRef);
  }
}
