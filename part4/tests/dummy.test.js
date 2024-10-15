const { test } = require('node:test')
const assert = require('node:assert')

const helpers = require('../src/utils/list_helpers')

test('dummy returns 1', () => {
    const blogs = []
   const result = helpers.dummy(blogs)
   assert.strictEqual(result, 1)
})