// Storage abstraction layer for seamless Firebase integration

export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  addToArray<T>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

function sortJournalEntries<T>(key: string, value: T): T {
  if (key !== 'journal_entries' || !Array.isArray(value)) return value;
  return [...value].sort((a, b) => {
    const aId = typeof a?.id === 'string' ? parseInt(a.id, 10) : 0;
    const bId = typeof b?.id === 'string' ? parseInt(b.id, 10) : 0;
    return bId - aId;
  }) as T;
}

function cleanUndefined<T>(value: T): T {
  if (value instanceof Date) return value;
  if (Array.isArray(value)) {
    return value.map(cleanUndefined) as T;
  }
  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      if (val !== undefined) {
        result[key] = cleanUndefined(val);
      }
    }
    return result as T;
  }
  return value;
}

export class SessionStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const item = sessionStorage.getItem(key);
    const parsed = item ? JSON.parse(item) : null;
    return sortJournalEntries<T>(key, parsed);
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  async addToArray<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    const current = await this.get<T[]>(key);
    const updated = Array.isArray(current) ? [...current, value] : [value];
    await this.set(key, updated);
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
    const parsed = item ? JSON.parse(item) : null;
    return sortJournalEntries<T>(key, parsed);
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  async addToArray<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    const current = await this.get<T[]>(key);
    const updated = Array.isArray(current) ? [...current, value] : [value];
    await this.set(key, updated);
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
    const { doc, getDoc, setDoc, deleteDoc, arrayUnion } = await import('firebase/firestore');
    const db = getFirestoreDb();
    if (!db) throw new Error('Firestore is not configured');
    return { db, doc, getDoc, setDoc, deleteDoc, arrayUnion };
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
    const value = data && data.value !== undefined ? data.value : null;
    return sortJournalEntries<T>(key, value);
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    const { db, doc, setDoc } = await this.getFirestore();
    await setDoc(doc(db, this.docRef(key)), { value: cleanUndefined(value), updatedAt: new Date() });
  }

  async addToArray<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    const { db, doc, setDoc, arrayUnion } = await this.getFirestore();
    await setDoc(
      doc(db, this.docRef(key)),
      { value: arrayUnion(cleanUndefined(value)), updatedAt: new Date() },
      { merge: true }
    );
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
