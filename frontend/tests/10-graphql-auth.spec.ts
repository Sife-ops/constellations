import { test, expect } from '@playwright/test';

test('graphql auth', async ({ page }) => {
  await page.goto('/');

  // login
  const emailInput = page.locator('.auto-login__emailInput');
  await emailInput.waitFor();
  await emailInput.click();
  // todo: global delay variable
  await emailInput.type('wyatt', { delay: 20 });
  const passwordInput = page.locator('.auto-login__passwordInput');
  await passwordInput.click();
  await passwordInput.type('pass', { delay: 20 });
  await page.click('.auto-login__submit');

  // check auth
  await page.click('.auto-nav__dev');
  const authtest = page.locator('.auto-authTest');
  await authtest.waitFor();
  await expect(authtest).toContainText('authtest');

  // wait for token to expire
  await page.click('.auto-nav__home');
  await page.waitForTimeout(15500);

  // check auth
  await page.click('.auto-nav__dev');
  await authtest.waitFor();
  await expect(authtest).toContainText('authtest');
});
