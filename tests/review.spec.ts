import { test, expect } from "@playwright/test";

test.describe("User Review Test cases", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/login");
		await page.fill('input[name="email"]', "user1@mycommission.com");
		await page.fill('input[name="password"]', "Mycommission");
		await page.click('button:has-text("Sign In")');
		await page.waitForURL("/home");
		await page.goto("/profile/22222222-2222-2222-2222-222222222222");
		await page.click('button:has-text("REVIEWS")');
	});

	test("Case 1: No rating provided", async ({ page }) => {
		await page.click('button[type="submit"]');
		await expect(page.locator("p.text-error")).toHaveText(
			"Rating is required",
		);
	});

	// Rating <= 0
	test("Case 2: Rating is zero", async ({ page }) => {
		const ratingZero = page.locator('input[name="rating"][value="0"]');
		await expect(ratingZero).toBeDisabled();

		await page.click('button[type="submit"]');
		await expect(page.locator("p.text-error")).toHaveText(
			"Rating is required",
		);
	});

	// Rating exceeds max (e.g., 6)
	test("Case 3: Rating exceeds allowed value (e.g. 6)", async ({ page }) => {
		const ratingInput = page.locator('input[name="rating"][value="6"]');
		await expect(ratingInput).toHaveCount(0); // Confirm it doesn't exist

		await page.click('button[type="submit"]'); // Submit without valid rating
		await expect(page.locator("p.text-error")).toHaveText(
			"Rating is required",
		);
	});

	test("Case 4: Valid rating, no description", async ({ page }) => {
		await page.click('input[name="rating"][value="3.5"]');
		await page.fill('textarea[name="review"]', "");
		await page.click('button[type="submit"]');

		// Wait for toast
		await expect(page.locator("div.alert.bg-green-500")).toHaveText(
			/The review has been submitted/,
		);
		await expect(page.locator("p.text-gray-800.text-sm").last()).toHaveText(
			"3.5 out of 5 stars",
		);
	});

	test("Case 5: Valid rating with description", async ({ page }) => {
		await page.click('input[name="rating"][value="5"]');
		await page.fill(
			'textarea[name="review"]',
			"Amazing work, I loved the commission!",
		);
		await page.click('button[type="submit"]');

		// Wait for toast
		await expect(page.locator("div.alert.bg-green-500")).toHaveText(
			/The review has been submitted/,
		);
		await expect(page.locator("p.text-gray-800.text-sm").last()).toHaveText(
			"5 out of 5 stars",
		);
	});
});
