const Blog = require('../models/blog');
const User = require('../models/user');

const testRouter = require('express').Router()

testRouter.post('/reset', async (request, response, next) => {
    try {
      await Blog.deleteMany({})
    
      response.status(200).send('Reset successful').end()
    }catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = testRouter;