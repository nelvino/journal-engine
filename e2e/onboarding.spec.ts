import { test, expect } from '@playwright/test';
import { mockUpdatePrompt } from './utils';

test.beforeEach(async ({ page }) => {
  await mockUpdatePrompt(page);
});

test('shows onboarding on first visit', async ({ page }) => {
  await page.goto('/');

  const dialog = page.getByRole('dialog', { name: /Welcome to Journal/i });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('heading', { name: /Welcome to Journal/i })).toBeVisible();
});

test('completes onboarding and reaches home', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Skip onboarding' }).click();

  await expect(page.getByRole('heading', { name: /Welcome to Journal/i })).toBeHidden();
  await expect(page.getByRole('link', { name: 'Today' })).toBeVisible();
});
