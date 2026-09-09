'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Home, Pen, Target, TrendingUp, Settings, Sun, Moon, Monitor, BookOpen, LogIn, LogOut, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, loginWithGoogle, logout } = useAuth();

  const navItems = [
    { href: '/', label: t.nav.home, icon: Home },
    { href: '/journal', label: t.nav.journal, icon: Pen },
    { href: '/goals', label: t.nav.goals, icon: Target },
    { href: '/progress', label: t.nav.progress, icon: TrendingUp },
    { href: '/settings', label: t.nav.settings, icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-foreground">
              My Journals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary-100 text-primary-700"
                      : "text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "p-2 rounded-md transition-all duration-300",
                  theme === 'light' 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-secondary-600 hover:text-foreground"
                )}
                aria-label="Light theme"
              >
                <Sun className="h-4 w-4" />
              </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                "p-2 rounded-md transition-all duration-300",
                theme === 'dark' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-secondary-600 hover:text-foreground"
              )}
              aria-label="Dark theme"
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={cn(
                "p-2 rounded-md transition-all duration-300",
                theme === 'system' 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-secondary-600 hover:text-foreground"
              )}
              aria-label="System theme"
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>

          {/* Auth Button */}
          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary-700 hover:bg-secondary-100 transition-colors"
              title={user.email || 'Sign out'}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span className="hidden sm:inline max-w-[120px] truncate">{user.displayName || user.email}</span>
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary-700 transition-colors shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-around py-2 border-t border-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-secondary-700 hover:bg-secondary-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};