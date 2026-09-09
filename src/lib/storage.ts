// Storage abstraction layer for seamless Firebase integration

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class SessionStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    sessionStorage.clear();
  }
}

export class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}

let firestoreAdapterInstance: FirestoreStorageAdapter | null = null;

export class FirestoreStorageAdapter implements StorageAdapter {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  private async getFirestore() {
    const { getFirestoreDb } = await import('@/lib/firebase');
    const { doc, getDoc, setDoc, deleteDoc } = await import('firebase/firestore');
    const db = getFirestoreDb();
    if (!db) throw new Error('Firestore is not configured');
    return { db, doc, getDoc, setDoc, deleteDoc };
  }

  private docRef(key: string) {
    return `users/${this.userId}/data/${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const { db, doc, getDoc } = await this.getFirestore();
    const snapshot = await getDoc(doc(db, this.docRef(key)));
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return data && data.value !== undefined ? data.value as T : null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    const { db, doc, setDoc } = await this.getFirestore();
    await setDoc(doc(db, this.docRef(key)), { value, updatedAt: new Date() });
  }

  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    const { db, doc, deleteDoc } = await this.getFirestore();
    await deleteDoc(doc(db, this.docRef(key)));
  }

  async clear(): Promise<void> {
    // Clearing a user's Firestore data safely requires batch deletes of known keys.
    // For now, this is a no-op to prevent accidental data loss.
    console.warn('[FirestoreStorageAdapter] clear() is not implemented to prevent accidental data loss.');
  }
}

export function getFirestoreAdapter(userId: string): StorageAdapter {
  if (!firestoreAdapterInstance || firestoreAdapterInstance['userId'] !== userId) {
    firestoreAdapterInstance = new FirestoreStorageAdapter(userId);
  }
  return firestoreAdapterInstance;
}

export function createStorageAdapter(userId?: string | null): StorageAdapter {
  const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';

  if (useFirebase && userId) {
    return getFirestoreAdapter(userId);
  }

  // For now, use local storage for persistence
  return new LocalStorageAdapter();
}
