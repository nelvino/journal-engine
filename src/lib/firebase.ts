import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, type Firestore } from 'firebase/firestore';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function isValidConfig(config: typeof firebaseConfig): boolean {
  return Boolean(config.apiKey && config.projectId && config.appId);
}

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

export function getFirebaseApp(): FirebaseApp | undefined {
  if (typeof window === 'undefined') return undefined;
  if (!isValidConfig(firebaseConfig)) return undefined;
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getFirebaseAuth(): Auth | undefined {
  if (typeof window === 'undefined') return undefined;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;
  if (!auth) {
    auth = getAuth(firebaseApp);
  }
  return auth;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!googleProvider) {
    googleProvider = new GoogleAuthProvider();
  }
  return googleProvider;
}

export function getFirestoreDb(): Firestore | undefined {
  if (typeof window === 'undefined') return undefined;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return undefined;
  if (!db) {
    db = initializeFirestore(firebaseApp, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });
  }
  return db;
}

export function initializeAnalytics(): Analytics | undefined {
  if (typeof window === 'undefined') return undefined;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp || !process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return undefined;
  if (!analytics) {
    try {
      analytics = getAnalytics(firebaseApp);
    } catch (e) {
      console.warn('[Firebase] Analytics could not be initialized:', e);
    }
  }
  return analytics;
}

// Keep named exports for backward compatibility, but they are lazy-safe only on client
export { app, auth, googleProvider, db, analytics };
