'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, LogIn, Loader2, User } from 'lucide-react';
import { cn, toLocalISODate } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useStorage } from '@/lib/useStorage';
import { useToast } from '@/context/ToastContext';
import type { JournalEntry } from '@/types';

interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

function NavLink({ item, layout }: { item: NavItem; layout: 'bottom' | 'rail' }) {
  const pathname = usePathname();
  const Icon = item.icon;
  const active = isActive(item.href, pathname);
  const rail = layout === 'rail';
  const bottom = layout === 'bottom';

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        rail
          ? 'flex flex-col items-center justify-center py-4 px-2 h-20 w-20 border-l-2'
          : 'relative z-10 flex flex-col items-center justify-center w-12 h-14 rounded-2xl transition-colors duration-300',
        rail && (active ? 'border-accent text-accent' : 'border-transparent text-ink-caption hover:text-ink')
      )}
    >
      <Icon
        className={cn(
          'w-5 h-5 transition-transform duration-300',
          rail && 'w-[21px] h-[21px] mb-0.5',
          bottom && (active ? 'text-paper scale-110' : 'text-ink-caption group-hover:text-ink')
        )}
        strokeWidth={1.5}
      />
      {rail && (
        <span className="font-sans text-[11px] font-medium leading-4 tracking-[0.02em] truncate max-w-full px-1">
          {item.label}
        </span>
      )}
      {bottom && (
        <span
          className={cn(
            'font-sans text-[9px] font-medium leading-3 tracking-[0.02em] transition-colors duration-300',
            active ? 'text-paper' : 'text-ink-caption group-hover:text-ink'
          )}
          aria-hidden="true"
        >
          {item.label}
        </span>
      )}
    </Link>
  );
}

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const storage = useStorage();
  const { addToast } = useToast();
  const pathname = usePathname();

  const nav: NavItem[] = useMemo(
    () => [
      { id: 'today', href: '/', label: t.nav.today, icon: Home },
      { id: 'pages', href: '/pages', label: t.nav.pages, icon: BookOpen },
      { id: 'practice', href: '/practice', label: t.nav.practice, icon: Calendar },
      { id: 'you', href: '/you', label: t.nav.you, icon: User },
    ],
    [t.nav]
  );

  const activeIndex = useMemo(
    () => nav.findIndex((item) => isActive(item.href, pathname)),
    [nav, pathname]
  );
  const itemSize = 48;
  const gap = 4;
  const paddingX = 8;
  const paddingTop = 8;

  useEffect(() => {
    let mounted = true;
    Promise.all([
      storage.get<JournalEntry[]>('journal_entries'),
      storage.get<any>('user_settings'),
    ]).then(([entries, settings]) => {
      if (!mounted || !settings) return;
      const today = toLocalISODate(new Date());
      const hasToday = (entries || []).some((e) => e.date === today);
      const now = new Date();
      const hour = now.getHours();
      const dayOfMonth = now.getDate();
      const reminderKey = `reminder_shown_${today}_${hour >= 17 ? 'evening' : hour < 11 ? 'morning' : 'midday'}`;

      let message: string | null = null;
      if (settings.morningPages && hour < 11 && !hasToday) {
        message = t.settings.morningPages;
      } else if (settings.eveningReminder && hour >= 17 && !hasToday) {
        message = t.settings.eveningReminder;
      } else if (settings.monthlyReread && dayOfMonth === 1 && !hasToday) {
        message = t.settings.monthlyReread;
      }

      if (message && !sessionStorage.getItem(reminderKey)) {
        addToast(message, 'info');
        sessionStorage.setItem(reminderKey, '1');
      }
    });
    return () => {
      mounted = false;
    };
  }, [storage, addToast, t]);

  return (
    <div className="min-h-screen bg-paper flex">
    {/* Left rail for md+ */}
    <nav
      className="hidden md:flex fixed top-0 left-0 bottom-0 w-20 bg-paper border-r border-rule flex-col items-center pt-6 z-50"
      aria-label="Primary"
    >
      {nav.map((item) => (
        <NavLink key={item.id} item={item} layout="rail" />
      ))}
    </nav>

    {/* Main content */}
    <main className="flex-1 w-full md:pl-20">
      <div className="min-h-screen w-full px-[26px] sm:px-[34px] md:px-8 lg:px-0 pt-6 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-6">
        <div className="w-full md:max-w-[720px] lg:max-w-[900px] md:mx-auto">
          {children}
        </div>
      </div>
    </main>

    {/* Bottom tab bar for mobile */}
    <nav
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-paper/85 backdrop-blur-md border border-rule rounded-full px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      aria-label="Primary"
    >
      {activeIndex !== -1 && (
        <div
          className="absolute z-0 w-12 h-14 rounded-2xl bg-ink transition-[left,opacity] duration-300 ease-out"
          style={{
            left: paddingX + activeIndex * (itemSize + gap),
            top: paddingTop,
          }}
          aria-hidden="true"
        />
      )}
      {nav.map((item) => (
        <NavLink key={item.id} item={item} layout="bottom" />
      ))}
    </nav>

    {/* Account indicator */}
    <Link
      href="/you"
      className="fixed top-6 right-4 md:top-6 md:right-6 z-50 w-11 h-11 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={loading ? 'Loading' : user ? t.settings.account : t.settings.signIn}
      title={loading ? 'Loading' : user ? (user.email ?? t.settings.account) : t.settings.signIn}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 text-ink-caption animate-spin" strokeWidth={1.5} aria-hidden="true" />
      ) : user?.photoURL ? (
        <img
          src={user.photoURL}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : user ? (
        <User className="w-5 h-5 text-ink-caption" strokeWidth={1.5} />
      ) : (
        <LogIn className="w-5 h-5 text-ink-caption hover:text-ink transition-colors" strokeWidth={1.5} />
      )}
    </Link>
  </div>
  );
};
