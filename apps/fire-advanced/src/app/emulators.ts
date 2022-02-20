import { connectAuthEmulator, Auth } from '@angular/fire/auth';
import { connectFirestoreEmulator, Firestore } from '@angular/fire/firestore';
import { connectFunctionsEmulator, Functions } from '@angular/fire/functions';
import { connectStorageEmulator, Storage } from '@angular/fire/storage';

const host = 'localhost';

export const connectAuthEmulatorInDevMode = (auth: Auth) =>
	connectAuthEmulator(auth, `http://${host}:9100`, { disableWarnings: true });

export const connectFirestoreEmulatorInDevMode = (firestore: Firestore) =>
	connectFirestoreEmulator(firestore, host, 9102);

export const connectStorageEmulatorInDevMode = (storage: Storage) =>
	connectStorageEmulator(storage, host, 9105);

export const connectFunctionsEmulatorInDevMode = (functions: Functions) =>
	connectFunctionsEmulator(functions, host, 9101);
