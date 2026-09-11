import { test, expect } from '@playwright/test';
import { seedOnboardingComplete, seedJournalEntries, mockUpdatePrompt } from './utils';

test.beforeEach(async ({ page }) => {
  await mockUpdatePrompt(page);
  await seedOnboardingComplete(page);
});

test('home loads and shows four navigation areas', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pages' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Practice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'You' })).toBeVisible();
});

test('cold start CTA invites first page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Write my first page' })).toBeVisible();
});

test('home shows a written entry with a valid time', async ({ page }) => {
  const today = new Date().toLocaleDateString('en-CA');
  await seedJournalEntries(page, [
    {
      id: 'e2e-1',
      userId: '',
      date: today,
      entryType: 'expressive',
      content: { text: 'E2E test entry' },
      sessionData: { duration: 1, startTime: new Date().toISOString(), endTime: new Date().toISOString(), wordCount: 8 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Written/ })).toBeVisible();
  await expect(page.getByText(/E2E test entry/)).toBeVisible();
  await expect(page.locator('text=Invalid Date')).toHaveCount(0);
});
