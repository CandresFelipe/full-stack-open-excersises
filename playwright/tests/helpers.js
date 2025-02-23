async function createBlog(page, content) {

    await page.getByTestId("title").fill(content)
    await page.getByTestId("author").fill('TestAuthor')
    await page.getByTestId("url").fill('http://test.com')
    
    await page.getByTestId('button-create').click();
}

module.exports = { createBlog };