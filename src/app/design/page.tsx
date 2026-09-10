'use client';

import React, { useState } from 'react';
import { Home, BookOpen, Calendar, User } from 'lucide-react';
import { SectionRule } from '@/components/design/SectionRule';
import { LedgerRow } from '@/components/design/LedgerRow';
import { RuledField } from '@/components/design/RuledField';
import { Button } from '@/components/design/Button';
import { TabBar } from '@/components/design/TabBar';
import type { Tab } from '@/components/design/TabBar';

const tabs: Tab[] = [
  { id: 'today', label: 'Today', icon: <Home className="w-[21px] h-[21px]" /> },
  { id: 'pages', label: 'Pages', icon: <BookOpen className="w-[21px] h-[21px]" /> },
  { id: 'practice', label: 'Practice', icon: <Calendar className="w-[21px] h-[21px]" /> },
  { id: 'you', label: 'You', icon: <User className="w-[21px] h-[21px]" /> },
];

export default function DesignPage() {
  const [active, setActive] = useState('today');

  return (
    <main className="min-h-screen bg-paper">
      <div className="px-[var(--gutter)] pt-6 pb-32 max-w-[430px] mx-auto">
        <h1 className="font-serif text-[30px] leading-[34px] text-ink mb-6">Design foundations</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="primary" size="md">Primary</Button>
          <Button variant="dark" size="md">Dark</Button>
          <Button variant="outline" size="md">Outline</Button>
          <Button variant="text" size="md">Text action</Button>
          <Button variant="danger" size="md">Delete</Button>
        </div>

        <SectionRule eyebrow="Recent pages">
          <LedgerRow
            day="08"
            month="SEP"
            title="Three things that went right"
            excerpt="The walk before the stand-up made the whole morning easier..."
            meta="Gratitude · 184 words"
            dot="accent"
          />
          <LedgerRow
            day="07"
            month="SEP"
            title="The email I did not send"
            excerpt="Wrote it out, read it back, deleted it. The thought record..."
            meta="Thought record · 402 words"
          />
          <LedgerRow
            day="05"
            month="SEP"
            title="Where I want to be in six months"
            excerpt="Less certain than last time I wrote this, and that is..."
            meta="Future self · 311 words"
            dot="sage"
          />
        </SectionRule>

        <div className="mt-8">
          <RuledField
            label="Three months from now"
            hint="What has changed? What are you doing differently?"
            placeholder="Start anywhere..."
            minHeight={116}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto">
        <TabBar tabs={tabs} active={active} onChange={setActive} />
      </div>
    </main>
  );
}
