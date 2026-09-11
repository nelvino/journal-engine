import React from 'react';
import { useRouter } from 'next/navigation';
import { cn, toDate } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/design/Button';
import type { HomeHeroState, HomeHeroStats } from '@/lib/homeHero';

interface HomeHeroProps {
  state: HomeHeroState;
  stats: HomeHeroStats;
}

function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ''));
}

function parseTitle(template: string, values: Record<string, string | number>): React.ReactNode[] {
  const replaced = template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ''));
  const parts = replaced.split('*');
  return parts.map((part, i) =>
    i % 2 === 0 ? (
      <React.Fragment key={i}>{part}</React.Fragment>
    ) : (
      <em className="italic" key={i}>{part}</em>
    )
  );
}

export const HomeHero: React.FC<HomeHeroProps> = ({ state, stats }) => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const locale = language === 'es' ? 'es-ES' : 'en-GB';
  const dateLabel = stats.now.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const weekday = stats.now.toLocaleDateString(locale, { weekday: 'long' });
  const shortTime = stats.now.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const startWriting = (type?: string) => {
    const query = type ? `?type=${type}` : '';
    router.push(`/journal/new${query}`);
  };

  const night = state === 'late';
  const dayText = stats.dayCount === 1 ? t.homeHero.day : t.homeHero.days;

  const renderTitle = (parts: React.ReactNode[]) => (
    <h1
      className={cn(
        'font-serif text-[40px] leading-[44px] mb-4',
        night ? 'text-paper-raised' : 'text-ink'
      )}
    >
      {parts.map((p, i) => (
        <React.Fragment key={i}>{p}</React.Fragment>
      ))}
    </h1>
  );

  const renderBody = (text: string) =>
    text ? (
      <p
        className={cn(
          'font-sans text-[15px] leading-[23px] mb-6',
          night ? 'text-paper-raised/85' : 'text-ink-secondary'
        )}
      >
        {text}
      </p>
    ) : null;

  const renderActions = (children: React.ReactNode) => (
    <div className="flex items-center gap-3 mb-4">{children}</div>
  );

  const renderRule = () => (
    <div className={cn('w-full h-0 border-t-2 mb-4', night ? 'border-paper-raised/30' : 'border-ink')} />
  );

  const renderNote = (text: string) =>
    text ? (
      <p
        className={cn(
          'font-sans text-[11.5px] leading-[19px]',
          night ? 'text-paper-raised/60' : 'text-ink-caption'
        )}
      >
        {text}
      </p>
    ) : null;

  const renderEyebrow = (text: string) =>
    text ? (
      <p
        className={cn(
          'font-sans text-[10px] font-semibold uppercase tracking-[0.16em] leading-4 mb-2',
          night ? 'text-paper-raised/70' : 'text-ink-caption'
        )}
      >
        {text}
      </p>
    ) : null;

  const s = t.homeHero.states[state];
  if (!s) return null;

  const common = { date: dateLabel, dayCount: stats.dayCount, dayText };

  const renderSection = () => {
    switch (state) {
      case 'coldStart':
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', common))}
            {renderTitle(parseTitle(s.title, {}))}
            {renderBody(format(s.body ?? '', common))}
            <Button
              variant="dark"
              size="lg"
              className="w-full mb-4"
              onClick={() => startWriting('expressive')}
            >
              {s.cta}
            </Button>
            {renderNote(format(s.note ?? '', common))}
          </div>
        );

      case 'morning':
      case 'midday':
      case 'evening':
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', common))}
            {renderTitle(parseTitle(s.title, {}))}
            {renderRule()}
            {s.subhead ? (
              <h2
                className={cn(
                  'font-serif text-[25px] leading-[30px] mb-2',
                  night ? 'text-paper-raised' : 'text-ink'
                )}
              >
                {s.subhead}
              </h2>
            ) : null}
            {renderBody(format(s.body ?? '', common))}
            {renderActions(
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() =>
                    startWriting(
                      state === 'morning'
                        ? 'stoic_morning'
                        : state === 'evening'
                        ? 'stoic_evening'
                        : 'expressive'
                    )
                  }
                >
                  {s.cta}
                </Button>
                <Button
                  variant="text"
                  onClick={() => startWriting('expressive')}
                >
                  {s.secondary}
                </Button>
              </>
            )}
          </div>
        );

      case 'late':
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', { weekday, time: shortTime }))}
            {renderTitle(parseTitle(s.title, {}))}
            {renderBody(format(s.body ?? '', common))}
            {renderActions(
              <>
                <Button
                  variant="light"
                  size="lg"
                  className="flex-1"
                  onClick={() => startWriting('expressive')}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="night-text"
                  onClick={() => router.push('/pages')}
                >
                  {s.secondary}
                </Button>
              </>
            )}
            {renderNote(format(s.note ?? '', common))}
          </div>
        );

      case 'written':
        if (!stats.todayEntry) return null;
        const type = t.entryTypes[stats.todayEntry.entryType]?.label || stats.todayEntry.entryType;
        const writtenAt = toDate(stats.todayEntry.createdAt) ?? new Date();
        const time = writtenAt.toLocaleTimeString(locale, {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        const words = stats.todayEntry.sessionData?.wordCount ?? 0;
        const minutes = stats.todayEntry.sessionData?.duration ?? 0;
        const minutesLabel = minutes === 1 ? t.homeHero.minute : t.homeHero.minutes;
        const bodyValues = {
          ...common,
          typeLabel: type,
          time,
          words,
          wordsLabel: t.homeHero.wordsLabel,
          minutes,
          minutesLabel,
        };
        const titleValues = { ...common, dayCount: stats.dayCount, dayText };
        const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === 'true';
        const where = user && useFirebase ? t.homeHero.cloudAndDevice : t.homeHero.deviceOnly;
        const noteValues = { ...common, where };
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', common))}
            {renderTitle(parseTitle(s.title, titleValues))}
            {renderBody(format(s.body ?? '', bodyValues))}
            {renderActions(
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => startWriting(stats.todayEntry?.entryType || 'expressive')}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/pages')}
                >
                  {s.secondary}
                </Button>
              </>
            )}
            {renderNote(format(s.note ?? '', noteValues))}
          </div>
        );

      case 'unfinished': {
        const draftTitle =
          stats.draft?.content?.text?.split('\n')[0].trim().slice(0, 120) || 'Untitled draft';
        const draftWords = stats.draft?.sessionData?.wordCount ?? 0;
        const draftDate = stats.draft?.createdAt
          ? new Date(stats.draft.createdAt)
          : new Date();
        const draftDay = draftDate.toLocaleDateString(locale, { weekday: 'long' });
        const draftType = stats.draft?.entryType
          ? (t.entryTypes as any)[stats.draft.entryType]?.label
          : 'Draft';
        const draftValues = {
          ...common,
          draftTitle,
          draftDay,
          draftWords,
          draftType,
          wordsLabel: t.homeHero.wordsLabel,
        };
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', common))}
            {renderTitle(parseTitle(s.title, {}))}
            <div
              className={cn(
                'pl-4 py-3 mb-4 border-l-2',
                night ? 'border-night-accent bg-paper-raised/5' : 'border-accent bg-accent/5'
              )}
            >
              <p
                className={cn(
                  'font-serif text-[17px] leading-[27px] mb-1',
                  night ? 'text-paper-raised' : 'text-ink'
                )}
              >
                {draftTitle}
              </p>
              <p
                className={cn(
                  'font-sans text-[11px] leading-4',
                  night ? 'text-paper-raised/70' : 'text-ink-caption'
                )}
              >
                {format(s.body ?? '', draftValues)}
              </p>
            </div>
            {renderActions(
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => startWriting(stats.draft?.entryType || 'expressive')}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="text"
                  onClick={() => startWriting('expressive')}
                >
                  {s.secondary}
                </Button>
              </>
            )}
            {renderNote(format(s.note ?? '', common))}
          </div>
        );
      }

      case 'return': {
        const away =
          stats.lastEntryDaysAgo >= 14 ? t.homeHero.awayLong : t.homeHero.awayShort;
        const lastTopic = stats.lastEntryTitle || t.homeHero.unknownTopic || 'the last thing you wrote';
        const returnValues = { ...common, away, lastTopic };
        return (
          <div>
            {renderEyebrow(format(s.eyebrow ?? '', common))}
            {renderTitle(parseTitle(s.title, returnValues))}
            {renderBody(format(s.body ?? '', returnValues))}
            {renderActions(
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => startWriting(stats.lastEntry?.entryType || 'expressive')}
                >
                  {s.cta}
                </Button>
                <Button
                  variant="text"
                  onClick={() => router.push('/pages')}
                >
                  {s.secondary}
                </Button>
              </>
            )}
            {renderNote(format(s.note ?? '', common))}
          </div>
        );
      }
    }
  };

  return (
    <section
      className={cn(
        'w-[calc(100%+52px)] sm:w-[calc(100%+68px)] md:w-[calc(100%+64px)] px-[26px] sm:px-[34px] md:px-8 py-8 mb-8 -mx-[26px] sm:-mx-[34px] md:-mx-8',
        night ? 'bg-night' : 'bg-paper'
      )}
    >
      <div className="w-full">
        {renderSection()}
      </div>
    </section>
  );
};
