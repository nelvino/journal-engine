import type { Page } from '@playwright/test';

const VERSION_KEY = 'journal-app-version';

export async function seedOnboardingComplete(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('onboarding_completed', 'true');
  });
}

export async function seedJournalEntries(page: Page, entries: any[]) {
  await page.addInitScript((value) => {
    localStorage.setItem('journal_entries', JSON.stringify(value));
  }, entries);
}

export async function seedIntentions(page: Page, intentions: any[]) {
  await page.addInitScript((value) => {
    localStorage.setItem('intentions', JSON.stringify(value));
  }, intentions);
}

export async function mockUpdatePrompt(page: Page) {
  await page.addInitScript((version) => {
    localStorage.setItem('journal-app-version', version);
  }, 'e2e');
  await page.route('**/version.json*', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ version: 'e2e' }),
    });
  });
}
