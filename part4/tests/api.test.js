const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const _ = require('lodash')

const app = require('../app')
const helpers = require('../src/utils/list_helpers')
const Blog = require('../src/models/blog')

const api = supertest(app)

describe('API HTTP request for /api/blogs path', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogsObjects = helpers.mockedBlogs.map((blog) => new Blog(blog))
        const blogsArray = blogsObjects.map((blog) => blog.save())
        
        await Promise.all(blogsArray)
    })

    test('GET the blog list as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const result = response.body.length

        assert.strictEqual(result, helpers.mockedBlogs.length)

    })

    test('VERIFY the unique identifier is named id', async () => {
       const response = await api.get('/api/blogs')

       const hasIdProperty = response.body.every((blog) => blog['id'])

       assert.strictEqual(hasIdProperty, true)
    })

    test('POST a new blog successfully', async () => {
        const rawBlog = {
            "title": "El Quijote de la Mancha",
            "author": "Miguel de Cervantes",
            "url": "https://example.com/el-quijote-de-la-mancha",
            "likes": 87,
        }

        await api.post('/api/blogs').send(rawBlog).expect(201).expect('Content-Type', /application\/json/)

        const blogAtEnd = await helpers.blogsInDb()
        assert.strictEqual(blogAtEnd.length, helpers.mockedBlogs.length + 1)

        const newBlogTitle = blogAtEnd.map((b) => b.title)

        assert(newBlogTitle.includes('El Quijote de la Mancha'))
    })

    test('VERIFY if likes property is part of the request, it will default to zero', async () => {
        const rawBlog = {
            "title": "El Quijote de la Mancha",
            "author": "Miguel de Cervantes",
            "url": "https://example.com/el-quijote-de-la-mancha",
        }

        await api.post('/api/blogs').send(rawBlog)

        const selectedBlog = await helpers.getBlogByProperty({title: 'El Quijote de la Mancha'})

        assert.strictEqual(selectedBlog.likes, 0)
    })

    test('VERIFY it returns 400 when title or url are missing', async () => {
        const rawBlogWithoutTitle = {
            "author": "Miguel de Cervantes",
            "url": "https://example.com/el-quijote-de-la-mancha",
            "likes": 34
        }

        await api.post('/api/blogs').send(rawBlogWithoutTitle).expect(400)
        const blogs1 = await helpers.blogsInDb()
        assert.strictEqual(blogs1.length, helpers.mockedBlogs.length)

        const rawBlogWithoutUrl = {
            "title": "El Quijote de la Mancha",
            "author": "Miguel de Cervantes",
            "likes": 10
        }

        await api.post('/api/blogs').send(rawBlogWithoutUrl).expect(400)
        const blogs2 = await helpers.blogsInDb()
        assert.strictEqual(blogs2.length, helpers.mockedBlogs.length)
    })
})

test('DELETE a blog successfully', async () => {
    const blogsAtStart = await helpers.blogsInDb()
    const blogId = blogsAtStart[0].id

    await api.delete(`/api/blogs/${blogId}`).expect(204)
    
    const blogsAtEnd = await helpers.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helpers.mockedBlogs.length - 1)
})

test('Return 400 when the id is invalid', async () => {
    const id ='q322222222'

    await api.get(`/api/blogs/${id}`).expect(400)
})

test('GET Return 200 and the blog that maches the id', async () => {
    const blogs = await helpers.blogsInDb()

    const blogId = blogs[1].id

    const response = await api.get(`/api/blogs/${blogId}`).expect(200).expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body, blogs[1])

})

test('UPDATE likes of the first blog', async () => {
    const blogs = await helpers.blogsInDb()

    const firstBlog = blogs[0]

    const newBlog = {
        ...firstBlog,
        likes: 100
    }

    const response = await api.put(`/api/blogs/${firstBlog.id}`).send(newBlog).expect(200).expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(response.body.likes, 100)
    assert.notDeepEqual(blogs[0], response.body)

})

after(async () => {
    await mongoose.connection.close()
})