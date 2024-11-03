const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { getRandomUser, getSpecificUserById } = require('../utils/list_helpers')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0})
    response.json(blogs)
  })
  
blogRouter.post('/create', async (request, response, next) => {
    const body = request.body

    if(!body.title || !body.url) {
      return response.status(400).json({
        error: 'Required fields title and/or url are missing'
      })
    }

    if(!body['likes']) {
      body.likes = 0
    }

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      const user  = await getSpecificUserById(decodedToken.userId)
  
      const blog = new Blog({
        ...body,
        user: user.id
      })
  
      const result = await blog.save()
      user.blogs = user.blogs.concat(result.id)
  
      await user.save()
  
      response.status(201).json(result)
    }catch (err) {
      next(err)
    }
 
  })

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete({ _id: id })
  response.sendStatus(204)
})

  blogRouter.get('/:id', async (request, response) => {
    const id = request.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({error: 'id is invalid'})
    }

    const blog = await Blog.findById({ _id: id })
    if(!blog) {
      return response.status(404).send({error: 'Blog not found with such ID'})
    }

    response.status(200).json(blog)

  })

  blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send({error: 'id is invalid'})
    }

    const randomUser = await getRandomUser()

    const body = request.body

    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: randomUser
    }

    const blog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
    if(!blog) {
      return response.status(404).send({error: 'Blog not found with such ID'})
    }
    response.json(blog.toJSON())
  })

module.exports = blogRouter