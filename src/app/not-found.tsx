'use client';

import { useRouter } from 'next/navigation';
import { Shell } from '@/components/design/Shell';
import { Button } from '@/components/design/Button';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <Shell>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-caption mb-2">
          404
        </p>
        <h1 className="font-serif text-[40px] leading-[44px] text-ink mb-3">
          {t.notFound.title}
        </h1>
        <p className="font-serif text-[17px] leading-[27px] text-ink-secondary mb-8 max-w-[320px]">
          {t.notFound.description}
        </p>
        <Button variant="dark" size="lg" onClick={() => router.push('/')}>
          {t.notFound.home}
        </Button>
      </div>
    </Shell>
  );
}
