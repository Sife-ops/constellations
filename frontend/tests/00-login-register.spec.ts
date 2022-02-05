import { test } from '@playwright/test';

test.skip('login/register', async ({ page }) => {
  await page.goto('/');
  await page.click('.auto-login__registerLink');

  await page.pause();

  // check email
  const random = randomString(10);
  const registerEmailInput = page.locator('#register-email');
  await registerEmailInput.type('wyatt', { delay: 20 });
  await page.waitForSelector('#email-registered');
  await registerEmailInput.type(random, { delay: 20 });
  await page.waitForSelector('#email-available');

  // check username
  const registerUsernameInput = page.locator('#register-username');
  await registerUsernameInput.type('wyatt', { delay: 20 });
  await page.waitForSelector('#username-registered');
  await registerUsernameInput.type(random, { delay: 20 });
  await page.waitForSelector('#username-available');

  // register failed
  await page.click('#register-submit');
  await page.waitForSelector('#register-failed');

  // register success
  await page.type('#register-password', 'pass', { delay: 20 });
  await page.click('#register-submit');
  await page.waitForSelector('#register-success');

  // login
  await page.waitForSelector('#login-email');
  await page.type('#login-email', 'wyatt' + random, { delay: 20 });
  await page.type('#login-password', 'pass', { delay: 20 });
  await page.click('#login-submit');

  // logout
  await page.waitForSelector('#logout');
  await page.click('#logout');
  await page.waitForSelector('#login-email');
});

const randomString = (length: number): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
