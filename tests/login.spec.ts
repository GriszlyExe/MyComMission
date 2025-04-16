import { test, expect } from '@playwright/test';

const correctEmail = 'johndoe@sample.com';
const correctPassword = 'John1234';
const wrongEmail = 'wrong@wrong.com';
const wrongPassword = 'wrongpass';
const invalidEmail = 'invalidemail'; // Invalid email format

test.describe('Login form tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Case 1: No email and no password', async ({ page }) => {
    await page.click('button:has-text("Sign In")');
  
    const errors = page.locator('p.text-error');
    await expect(errors.nth(0)).toHaveText('Email is required');
    await expect(errors.nth(1)).toHaveText('Password is required');
  });
  

  test('Case 2: Wrong email, no password', async ({ page }) => {
    await page.fill('input[name="email"]', wrongEmail);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('p.text-error')).toHaveText('Password is required');
  });

  test('Case 3: Wrong password, no email', async ({ page }) => {
    await page.fill('input[name="password"]', wrongPassword);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('p.text-error')).toHaveText('Email is required');
  });

  test('Case 4: Correct email, no password', async ({ page }) => {
    await page.fill('input[name="email"]', correctEmail);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('p.text-error')).toHaveText('Password is required');
  });

  test('Case 5: Correct password, no email', async ({ page }) => {
    await page.fill('input[name="password"]', correctPassword);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('p.text-error')).toHaveText('Email is required');
  });

  test('Case 6: Correct email, wrong password', async ({ page }) => {
    await page.fill('input[name="email"]', correctEmail);
    await page.fill('input[name="password"]', wrongPassword);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('span.text-error')).toHaveText('Wrong email or password');
  });

  test('Case 7: Correct password, wrong email', async ({ page }) => {
    await page.fill('input[name="email"]', wrongEmail);
    await page.fill('input[name="password"]', correctPassword);
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('span.text-error')).toHaveText('Wrong email or password');
  });

  test('Case 8: Invalid email format', async ({ page }) => {
    await page.fill('input[name="email"]', invalidEmail); // Invalid email format
    await page.click('button:has-text("Sign In")');
    await expect(page.locator('p.text-error')).toHaveText('Invalid email format');
  });

  test('Case 9: Correct email and password', async ({ page }) => {
    await page.fill('input[name="email"]', correctEmail);
    await page.fill('input[name="password"]', correctPassword);
    await page.click('button:has-text("Sign In")');

    // Expect redirect to dashboard or homepage
    await expect(page).not.toHaveURL('/login');
    await expect(page).toHaveURL('/home'); // adjust if needed
  });
});
