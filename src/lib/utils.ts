import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toLocalISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function localDateFromISO(iso: string): Date {
  const [y, m, day] = iso.split("-").map(Number);
  return new Date(y, m - 1, day);
}

export function toDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') return new Date(value);
  const asAny = value as { toDate?: () => Date; seconds?: number; nanoseconds?: number };
  if (typeof asAny.toDate === 'function') return asAny.toDate();
  if (typeof asAny.seconds === 'number') return new Date(asAny.seconds * 1000 + (asAny.nanoseconds ?? 0) / 1_000_000);
  return undefined;
}