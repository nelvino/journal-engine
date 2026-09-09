'use client';

import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createStorageAdapter, type StorageAdapter } from './storage';

export function useStorage(): StorageAdapter {
  let userId: string | null = null;
  try {
    const { user } = useAuth();
    userId = user?.uid || null;
  } catch {
    // No AuthProvider available (e.g., tests). Default to local storage.
  }
  return useMemo(() => createStorageAdapter(userId), [userId]);
}
