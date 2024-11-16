const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const { getRandomUser } = require('../utils/list_helpers')
const User = require('../models/user')

blogRouter.get('/', async (request, response, next) => {
    const userId = request.user.id
    try {
      const fetchedUser = await User.findOne({_id: userId}, {name: 1}).populate('blogs')
    response.json(fetchedUser)
    }catch(err) {
      next(err)
    }
    
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
      const user = request.user
      const blog = new Blog({
        ...body,
        user: user.userId
      })
  
      const result = await blog.save()
      user.blogs = user.blogs.concat(result.id)
  
      await user.save()
      response.status(201).json(result.toJSON())
    }catch (err) {
      next(err)
    }
 
  })

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {    
    await Blog.findByIdAndDelete(id)  
    response.sendStatus(204)
  } catch(err) {
    next(err)
  }
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

  blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    
    const user = request.user;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      console.log('this is happening ?')
      return response.status(400).send({error: 'id is invalid'})
    }

    try { 
    const body = request.body
    
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user
    }

    const blog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
    if(!blog) {
      return response.status(404).send({error: 'Blog not found with such ID'})
    }
    response.json(blog.toJSON())
    }catch(error) {
      next(error)
    }
    
  })

module.exports = blogRouter