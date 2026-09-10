import { test, expect } from '@playwright/test';
import { seedOnboardingComplete, seedJournalEntries, mockUpdatePrompt } from './utils';

test.beforeEach(async ({ page }) => {
  await mockUpdatePrompt(page);
});

test('onboarding modal matches design', async ({ page }) => {
  await page.goto('/');

  const dialog = page.getByRole('dialog', { name: /Welcome to Journal/i });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveScreenshot('onboarding-modal.png');
});

test('new entry wizard step 1 matches design', async ({ page }) => {
  await seedOnboardingComplete(page);
  await page.goto('/journal/new');

  await expect(page).toHaveScreenshot('journal-new-step1.png');
});

test('journal reader matches design', async ({ page }) => {
  await seedOnboardingComplete(page);
  await seedJournalEntries(page, [
    {
      id: '1',
      entryType: 'expressive',
      date: '2026-09-10',
      content: { text: 'This is a sample entry.', questions: [] },
      sessionData: { duration: 10, wordCount: 6, startTime: '2026-09-10T09:00:00.000Z', endTime: '2026-09-10T09:10:00.000Z' },
      createdAt: '2026-09-10T09:10:00.000Z',
      updatedAt: '2026-09-10T09:10:00.000Z',
    },
  ]);

  await page.goto('/journal/1');
  await expect(page.getByText('This is a sample entry.')).toBeVisible();
  await expect(page).toHaveScreenshot('journal-reader.png');
});
