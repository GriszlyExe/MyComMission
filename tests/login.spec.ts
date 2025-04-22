import { test, expect } from "@playwright/test";

const emptyEmail = "";
const emailWithoutFQDN = "invalidemail@";
const emailWithoutUsername = "@domain.tld";
const unregisteredEmail = "wrong@wrong.com";
const correctEmail = "user1@mycommission.com";
const emptyPassword = "";
const wrongPassword = "wrongpass";
const correctPassword = "Mycommission";
const bannedEmail = "banned@domain.com";
const bannedPassword = "Bannedpass"

test.describe("User Login Test cases", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/login");
	});

	test("Case 1: Email is empty", async ({ page }) => {
		await page.fill('input[name="email"]', emptyEmail);
		await page.fill('input[name="password"]', correctPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("p.text-error")).toContainText(
			"Email is required",
		);
	});

	test("Case 2: Email missing FQDN", async ({ page }) => {
		await page.fill('input[name="email"]', emailWithoutFQDN);
		await page.fill('input[name="password"]', correctPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("p.text-error")).toContainText(
			"Invalid email format",
		);
	});

	test("Case 3: Email missing username", async ({ page }) => {
		await page.fill('input[name="email"]', emailWithoutUsername);
		await page.fill('input[name="password"]', correctPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("p.text-error")).toContainText(
			"Invalid email format",
		);
	});

	test("Case 4: Unregistered email", async ({ page }) => {
		await page.fill('input[name="email"]', unregisteredEmail);
		await page.fill('input[name="password"]', correctPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("span.text-error")).toHaveText(
			"Wrong email or password",
		);
	});

	test("Case 5: Password is empty", async ({ page }) => {
		await page.fill('input[name="email"]', correctEmail);
		await page.fill('input[name="password"]', emptyPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("p.text-error")).toContainText(
			"Password is required",
		);
	});

	test("Case 6: Registered email, wrong password", async ({ page }) => {
		await page.fill('input[name="email"]', correctEmail);
		await page.fill('input[name="password"]', wrongPassword);
		await page.click('button:has-text("Sign In")');
		await expect(page.locator("span.text-error")).toHaveText(
			"Wrong email or password",
		);
	});

	test("Case 7: Correct email and password", async ({ page }) => {
		await page.fill('input[name="email"]', correctEmail);
		await page.fill('input[name="password"]', correctPassword);
		await page.click('button:has-text("Sign In")');

		// Expect redirect to dashboard or homepage
		await expect(page).not.toHaveURL("/login");
		await expect(page).toHaveURL("/home");
	});

	test("Case 8: Both email and password are empty", async ({ page }) => {
		await page.fill('input[name="email"]', emptyEmail);
		await page.fill('input[name="password"]', emptyPassword);
		await page.click('button:has-text("Sign In")');

		const errors = page.locator("p.text-error");
		await expect(errors.nth(0)).toHaveText("Email is required");
		await expect(errors.nth(1)).toHaveText("Password is required");
	});

	test("Cast 9: The user is banned", async ({ page }) => {
		await page.fill('input[name="email"]', bannedEmail);
		await page.fill('input[name="password"]', bannedPassword);
		await page.click('button:has-text("Sign In")');

		await expect(page.locator("span.text-error")).toHaveText(
			"User is banned!",
		);
	})
});
