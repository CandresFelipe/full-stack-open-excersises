const { test, describe } = require('node:test')
const assert = require('node:assert')

const helpers = require('../src/utils/list_helpers')


describe('TotalLikes', () => {
    test('When blog list is zero', () => {
        const blogs = []

        const result = helpers.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })

    test('When the blog list only has one item', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            }
          ]
        const result = helpers.totalLikes(listWithOneBlog)

        assert.strictEqual(result, 5)
    })
    test('When blog list have many likes', () => {
        const listWithManyBlogs = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            },
            {
              _id: '5a422ba71b54a676234d17f9',
              title: 'Structured Programming with go to Statements',
              author: 'Donald E. Knuth',
              url: 'https://stanford.edu/~knuth/go-to-statements.pdf',
              likes: 10,
              __v: 0
            },
            {
              _id: '5a422ca71b54a676234d17fa',
              title: 'The Mythical Man-Month',
              author: 'Frederick P. Brooks',
              url: 'https://archive.org/details/mythical-man-month',
              likes: 7,
              __v: 0
            },
            {
              _id: '5a422da71b54a676234d17fb',
              title: 'Reflections on Trusting Trust',
              author: 'Ken Thompson',
              url: 'https://dl.acm.org/doi/10.1145/358198.358210',
              likes: 15,
              __v: 0
            },
            {
              _id: '5a422ea71b54a676234d17fc',
              title: 'No Silver Bullet: Essence and Accidents of Software Engineering',
              author: 'Frederick P. Brooks',
              url: 'https://archive.org/details/no-silver-bullet',
              likes: 8,
              __v: 0
            }
          ];
        const totalLikes = 45

        const result = helpers.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, totalLikes)
    })
})