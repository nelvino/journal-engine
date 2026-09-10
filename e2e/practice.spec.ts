import { test, expect } from '@playwright/test';
import { seedOnboardingComplete, seedJournalEntries, seedIntentions, mockUpdatePrompt } from './utils';

test.beforeEach(async ({ page }) => {
  await mockUpdatePrompt(page);
  await seedOnboardingComplete(page);
  await seedJournalEntries(page, [
    {
      id: '1',
      entryType: 'expressive',
      date: '2026-09-10',
      content: { text: 'Today I felt calm.' },
      sessionData: { duration: 10, wordCount: 5, startTime: '2026-09-10T09:00:00.000Z', endTime: '2026-09-10T09:10:00.000Z' },
      createdAt: '2026-09-10T09:10:00.000Z',
      updatedAt: '2026-09-10T09:10:00.000Z',
    },
  ]);
  await seedIntentions(page, [
    {
      id: '1',
      text: 'Read 10 pages each evening',
      target: 5,
      current: 2,
      createdAt: '2026-09-01',
    },
  ]);
});

test('shows practice record with a journal entry', async ({ page }) => {
  await page.goto('/practice');

  await expect(page.getByText('Your path', { exact: false })).toBeVisible();
  await expect(page.getByText('Current run')).toBeVisible();
  await expect(page.getByText('1', { exact: true }).first()).toBeVisible();
});
