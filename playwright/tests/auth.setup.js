const { test, expect } = require('@playwright/test');
const path = require('path');

const authFile = path.join(__dirname, '../.auth/user.json');

const setup = test;
setup("authenticate", async ({ page }) => {

    await page.goto('/');
    await page.getByTestId("username").fill('TestPart5')
    await page.getByTestId("password").fill('Qwerty123')
        
    page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText('Blogs')).toBeVisible();

    await page.context().storageState({ path: authFile });
})