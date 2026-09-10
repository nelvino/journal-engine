'use client';

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, User } from 'lucide-react';
import { cn, toLocalISODate } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
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

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        rail
          ? 'flex-col justify-center py-4 px-2 h-20 w-20 border-l-2'
          : 'flex-col justify-start h-16 pb-5 pt-2 flex-1 border-t-2',
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-ink-caption hover:text-ink'
      )}
    >
      <Icon className="w-[21px] h-[21px] mb-0.5" strokeWidth={1.5} />
      <span className="font-sans text-[11px] font-medium leading-4 tracking-[0.02em] truncate max-w-full px-1">
        {item.label}
      </span>
    </Link>
  );
}

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const storage = useStorage();
  const { addToast } = useToast();

  const nav: NavItem[] = useMemo(
    () => [
      { id: 'today', href: '/', label: t.nav.today, icon: Home },
      { id: 'pages', href: '/pages', label: t.nav.pages, icon: BookOpen },
      { id: 'practice', href: '/practice', label: t.nav.practice, icon: Calendar },
      { id: 'you', href: '/you', label: t.nav.you, icon: User },
    ],
    [t.nav]
  );

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
      <div className="min-h-screen w-full px-[26px] sm:px-[34px] md:px-8 lg:px-0 pt-6 pb-28 md:pb-6">
        <div className="w-full md:max-w-[620px] lg:max-w-[680px] md:mx-auto">
          {children}
        </div>
      </div>
    </main>

    {/* Bottom tab bar for mobile */}
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-paper border-t border-rule flex z-50"
      aria-label="Primary"
    >
      {nav.map((item) => (
        <NavLink key={item.id} item={item} layout="bottom" />
      ))}
    </nav>
  </div>
  );
};
