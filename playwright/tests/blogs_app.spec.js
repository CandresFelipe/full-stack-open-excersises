const { test, expect, describe, beforeEach } = require('@playwright/test')
const { createBlog } = require('./helpers')

describe('GIVEN Blogs app', () => {
    
    test('WHEN launching intro page (not authed) and login form page is showed', async ({ page }) => {
        
      await page.goto('/')
      await page.getByTestId('button-logout').click()
        
      const locator = page.getByText('log in to the application')
      const buttons = page.locator('button')
      const inputs = page.locator('input')
    
      const buttonCount = await buttons.count();
      const inputCount = await inputs.count();

      await expect(locator).toBeVisible()
        expect(buttonCount).toBe(1)
        expect(inputCount).toBe(2)
    })

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/test/reset')
        await page.goto('/')
    })

    test("WHEN user creates a blog successfully", async ({ page }) => {
        await page.getByTestId("button-create-blog").click();
        await createBlog(page, 'TestBlog')
        await page.getByTestId('button-show').click();

        await expect(page.getByTestId('p-url').first()).toBeVisible();
        await expect(page.getByTestId('p-likes').first()).toBeVisible();
        await expect(page.getByTestId('p-author').first()).toBeVisible();

    })

    test("WHEN user creates a blog and adds a like", async ({ page }) => {
        await page.getByTestId("button-create-blog").click();
        await createBlog(page, 'TestBlog')
        await page.getByTestId('button-show').click();

        await page.getByTestId('button-like').click();
        
        await expect(page.getByTestId('p-likes').first()).toContainText('Likes: 1')

    })

    test('WHEN checking blogs are arranged by likes', async ({ page }) => {
        
        await page.getByTestId("button-create-blog").click();
        await createBlog(page, 'TestBlog1');
        const successDiv1 = page.getByTestId('notification-success');
        await expect(successDiv1).toBeVisible()
        await expect(successDiv1).toBeHidden();
        await createBlog(page, 'TestBlog2');
        const successDiv2 = page.getByTestId('notification-success');
        await expect(successDiv2).toBeVisible()
        await expect(successDiv1).toBeHidden();
        await createBlog(page, 'TestBlog3');
        const successDiv3 = page.getByTestId('notification-success');
        await expect(successDiv3).toBeVisible()

        const blogList = await page.getByTestId('blog-list').getByTestId('blog-item').count();
        expect(blogList).toBe(3);


        const buttonsShow = await page.getByTestId('button-show').all();
        const buttonLikes = await page.getByTestId('button-like').all();
        await buttonsShow[0].click();
        await buttonLikes[0].click({ clickCount: 12});

        await buttonsShow[1].click();
        await buttonLikes[1].click({ clickCount: 2});

        await buttonsShow[2].click();
        await buttonLikes[2].click({ clickCount: 43});

        await page.reload();

        await buttonsShow[0].click();
        await buttonsShow[1].click();
        await buttonsShow[2].click();
    })

    test("WHEN user deletes a blog just created", async ({ page }) => {
        await page.getByTestId("button-create-blog").click();
        await createBlog(page, 'TestBlog');
        await page.getByTestId('button-show').click();

        await page.getByTestId('button-delete').click();
        const blogsCount = await page.getByTestId('blog-list').locator('blog-item').count();
        expect(blogsCount).not.toBe(1);

    })
    
    test("WHEN loging fails with wrong credentials", async ({ page }) => {
        await page.getByTestId('button-logout').click()
            
        await page.getByTestId("username").fill('test@gmail.com')
        await page.getByTestId("password").fill('passwordFake')

        page.getByRole('button', { name: /submit/i }).click();

        const errorDiv = await page.getByTestId('notification-error');
        await expect(errorDiv).toBeVisible()
    })

})
