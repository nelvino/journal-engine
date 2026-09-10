import { test, expect } from '@playwright/test';
import { seedOnboardingComplete, mockUpdatePrompt } from './utils';

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
