import { environment } from '../../environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config';

export const FIREBASE_MODULES = [
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideStorage(() => getStorage()),
  //provideFunctions(() => getFunctions()),
  //provideAnalytics(() => getAnalytics()),
  //provideMessaging(() => getMessaging()),
  //providePerformance(() => getPerformance()),
  //provideRemoteConfig(() => getRemoteConfig()),
];

export const FIREBASE_PROVIDERS = [
  //ScreenTrackingService, UserTrackingService
];
