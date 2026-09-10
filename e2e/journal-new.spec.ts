import { test, expect } from '@playwright/test';
import { seedOnboardingComplete, mockUpdatePrompt } from './utils';

test.beforeEach(async ({ page }) => {
  await mockUpdatePrompt(page);
  await seedOnboardingComplete(page);
});

test('new entry shows three-step wizard', async ({ page }) => {
  await page.goto('/journal/new');

  await expect(page.getByRole('heading', { name: 'New Journal Entry' })).toBeVisible();
  await expect(page.getByText('Step 1 of 3')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});

test('shows locked and unlocked styles on first visit', async ({ page }) => {
  await page.goto('/journal/new');

  await expect(page.getByRole('button', { name: 'Expressive Writing' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Gratitude' })).toBeVisible();
  // Locked styles show the level tag and are disabled
  await expect(page.getByRole('button', { name: /CBT Thought Record/i })).toBeVisible();
});
