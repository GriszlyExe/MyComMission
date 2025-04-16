import { test, expect } from '@playwright/test';

test.describe('Review Form Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'reviewer@sample.com');
    await page.fill('input[name="password"]', 'Reviewer1234');
    await page.click('button:has-text("Sign In")');
    await page.waitForURL('/home');
    await page.goto('/profile/25dd672d-4fc2-4d1d-b540-b50272207783');
    await page.click('button:has-text("REVIEWS")')
  });

  test('Case 1: Submit without rating shows validation error', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('p.text-error')).toHaveText('Rating is required');
  });

  test('Case 2: Submit with rating only (no description)', async ({ page }) => {
    await page.click('input[name="rating"][value="4.5"]');
    await page.click('button[type="submit"]');

    // Wait for toast
    await expect(page.locator('div.alert.bg-green-500')).toHaveText(/The review has been submitted/);
  });

  test('Case 3: Submit with rating and description', async ({ page }) => {
    await page.click('input[name="rating"][value="5"]');
    await page.fill('textarea[name="review"]', 'Amazing work, I loved the commission!');
    await page.click('button[type="submit"]');

    // Wait for toast
    await expect(page.locator('div.alert.bg-green-500')).toHaveText(/The review has been submitted/);
  });

});
