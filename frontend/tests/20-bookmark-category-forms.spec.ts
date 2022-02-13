import { login as l } from './selector';
import { test, Page } from '@playwright/test';
import { typeDelay as delay, user } from './constant';

test.describe('Bookmark and Category Forms', async () => {
  let page: Page;
  let baseURL: string;
  test.beforeAll(async ({ browser }, testInfo) => {
    page = await browser.newPage();
    baseURL = testInfo.project.use.baseURL;
  });

  test('Login', async () => {
    await page.goto(baseURL);
    await page.type(l.form.email, user.email, { delay });
    await page.type(l.form.password, user.password, { delay });
    await page.click(l.form.submit);
  });

  test('_', async () => {
    await page.pause();
  });
});
