const { test, describe } = require('node:test')
const assert = require('node:assert')

const helpers = require('../src/utils/list_helpers')

describe('Find favorite blog that contains the max numbers of likes', () => {
    test('When the blog list has no items', () => {
        const blogList = []

        const result = helpers.findFavoriteBlog(blogList)

        assert.strictEqual(result, null)
    })

    test('With a list with many blogs', () => {
        const blogs = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            },
            {
              _id: '5a422bb71b54a676234d17f9',
              title: 'Structured Programming with go to Statements',
              author: 'Donald E. Knuth',
              url: 'https://stanford.edu/~knuth/go-to-statements.pdf',
              likes: 12,
              __v: 0
            },
            {
              _id: '5a422cc71b54a676234d17fa',
              title: 'The Mythical Man-Month',
              author: 'Frederick P. Brooks',
              url: 'https://archive.org/details/mythical-man-month',
              likes: 8,
              __v: 0
            },
            {
              _id: '5a422dd71b54a676234d17fb',
              title: 'Reflections on Trusting Trust',
              author: 'Ken Thompson',
              url: 'https://dl.acm.org/doi/10.1145/358198.358210',
              likes: 15,
              __v: 0
            },
            {
              _id: '5a422ee71b54a676234d17fc',
              title: 'No Silver Bullet: Essence and Accidents of Software Engineering',
              author: 'Frederick P. Brooks',
              url: 'https://archive.org/details/no-silver-bullet',
              likes: 7,
              __v: 0
            },
            {
              _id: '5a422ff71b54a676234d17fd',
              title: 'An Axiomatic Basis for Computer Programming',
              author: 'C.A.R. Hoare',
              url: 'https://www.cs.cmu.edu/~crary/819-f09/Hoare69.pdf',
              likes: 10,
              __v: 0
            },
            {
              _id: '5a4230071b54a676234d17fe',
              title: 'The Humble Programmer',
              author: 'Edsger W. Dijkstra',
              url: 'https://dl.acm.org/doi/10.1145/358896.358899',
              likes: 20,
              __v: 0
            },
            {
              _id: '5a4231181b54a676234d17ff',
              title: 'Programming Without Objects',
              author: 'David Parnas',
              url: 'https://dl.acm.org/doi/10.1145/101593.101601',
              likes: 9,
              __v: 0
            },
            {
              _id: '5a4232291b54a676234d1800',
              title: 'The Art of Software Design',
              author: 'John Outlaw',
              url: 'https://www.example.com/software-design',
              likes: 6,
              __v: 0
            },
            {
              _id: '5a42333a1b54a676234d1801',
              title: 'Turing Award Lecture: Logic of Programming',
              author: 'Tony Hoare',
              url: 'https://www.turing-award.org/lecture/tony-hoare',
              likes: 18,
              __v: 0
            }
          ];

          const favoriteBlog = {
            _id: '5a4230071b54a676234d17fe',
            title: 'The Humble Programmer',
            author: 'Edsger W. Dijkstra',
            url: 'https://dl.acm.org/doi/10.1145/358896.358899',
            likes: 20,
            __v: 0
          }

          const result = helpers.findFavoriteBlog(blogs)

          assert.deepStrictEqual(result, favoriteBlog)
          
    })
})