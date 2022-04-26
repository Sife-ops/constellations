import { test, expect } from '@playwright/test';

test('sorting', async ({ page }) => {
  await page.goto('/');

  // Click text=Sign In
  await page.locator('text=Sign In').click();
  // assert.equal(page.url(), 'http://localhost:3000/login');

  // Click [placeholder="username"]
  await page.locator('[placeholder="username"]').click();

  // Fill [placeholder="username"]
  await page.locator('[placeholder="username"]').fill('playwright00');

  // Press Tab
  await page.locator('[placeholder="username"]').press('Tab');

  // Fill [placeholder="password"]
  await page.locator('[placeholder="password"]').fill('test');

  // Check input[type="checkbox"]
  await page.locator('input[type="checkbox"]').check();

  // Click text=Remember meSign In >> #at-loginForm__submit
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/home' }*/),
    page.locator('text=Remember meSign In >> #at-loginForm__submit').click(),
  ]);

  await page.waitForLoadState('networkidle');

  const locator = page.locator('//tr');
  let count = await locator.count();
  expect(count).toBe(4);

  // Click text=category00
  await page.locator('text=category00').click();

  count = await locator.count();
  expect(count).toBe(2);

  // Click text=category01
  await page.locator('text=category01').click();

  count = await locator.count();
  expect(count).toBe(1);

  await page.pause();
});
