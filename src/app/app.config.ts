import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore  } from '@angular/fire/firestore';

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyARpvWFvJay0K51fcFxZdAO3yEoeoebvsA',
        authDomain: 'clips-e3c08.firebaseapp.com',
        projectId: 'clips-e3c08',
        storageBucket: 'clips-e3c08.firebasestorage.app',
        messagingSenderId: '809274114827',
        appId: '1:809274114827:web:9354ca49b04941ccf8d80e',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()) 
  ],
};
