import { test, expect } from "@playwright/test";

test("graphql auth", async ({ page }) => {
  await page.goto("/");

  // login
  await page.waitForSelector("#login-email");
  await page.type("#login-email", "wyatt", { delay: 20 });
  await page.type("#login-password", "pass", { delay: 20 });
  await page.click("#login-submit");

  // check auth
  await page.click("#nav__dev");
  const authtest = page.locator("#authtest");
  await authtest.waitFor();
  await expect(authtest).toContainText("authtest");

  // wait for token to expire
  await page.click("#nav__home");
  await page.waitForTimeout(15500);

  // check auth
  await page.click("#nav__dev");
  await authtest.waitFor();
  await expect(authtest).toContainText("authtest");
});
