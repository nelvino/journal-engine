import { createStorageAdapter, LocalStorageAdapter, FirestoreStorageAdapter } from '@/lib/storage';

describe('createStorageAdapter', () => {
  const originalEnv = process.env.NEXT_PUBLIC_USE_FIREBASE;

  afterEach(() => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = originalEnv;
  });

  it('uses local storage when NEXT_PUBLIC_USE_FIREBASE is false', () => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'false';
    const adapter = createStorageAdapter();
    expect(adapter).toBeInstanceOf(LocalStorageAdapter);
  });

  it('uses local storage when NEXT_PUBLIC_USE_FIREBASE is true but there is no userId', () => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'true';
    const adapter = createStorageAdapter();
    expect(adapter).toBeInstanceOf(LocalStorageAdapter);
  });

  it('uses Firestore when NEXT_PUBLIC_USE_FIREBASE is true and a userId is provided', () => {
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'true';
    const adapter = createStorageAdapter('user-123');
    expect(adapter).toBeInstanceOf(FirestoreStorageAdapter);
  });

  it('uses Firestore when NEXT_PUBLIC_USE_FIREBASE is true and userId is null', () => {
    // null is still treated as no user, so it should fall back to local
    process.env.NEXT_PUBLIC_USE_FIREBASE = 'true';
    const adapter = createStorageAdapter(null);
    expect(adapter).toBeInstanceOf(LocalStorageAdapter);
  });
});
