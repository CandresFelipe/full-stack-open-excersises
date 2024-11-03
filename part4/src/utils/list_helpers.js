const _ = require('lodash')
const Blog = require('../models/blog')
const logger = require('../utils/middlewares')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const dummy = (blogs) => {
    if(blogs) return 1
  }
  
const totalLikes = (blogs) => {
    if(!blogs) return 0

    const result = blogs.reduce((total, blog) => total + blog.likes , 0)
    return result
}

const findFavoriteBlog = (blogs) => {
    if(!blogs || blogs.length === 0) return null

    let favoriteBlog = blogs[0]

    blogs.forEach(blog => {
        if(blog.likes > favoriteBlog.likes) {
            favoriteBlog = blog
        }
    });

    return favoriteBlog
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0) return null

    const blogsByAuthor = _.groupBy(blogs, blog => blog.author);

    const blogCounts = _.mapValues(blogsByAuthor, author => author.length)

  // Find the author with the most blogs
  const bestAuthor = _.maxBy(Object.keys(blogCounts), author => blogCounts[author]);

  return {
    author: bestAuthor,
    blogs: blogCounts[bestAuthor]
  };
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0) return null

    const groupedByAuthor = _.groupBy(blogs, blogs => blogs.author)

    const likesCountByAuthor = _.mapValues(groupedByAuthor, (author) => {
        const likesAcc = author.reduce((acc, blog) => acc + blog.likes, 0)
        return likesAcc
    })

    const mostLikesAuthor = _.maxBy(Object.keys(likesCountByAuthor), (author) => likesCountByAuthor[author])

    return {
        author: mostLikesAuthor,
        likes: likesCountByAuthor[mostLikesAuthor]
    }
}

const mockedBlogs = [
    {
      "title": "JavaScript Promises: An Introduction",
      "author": "Kyle Simpson",
      "url": "https://example.com/js-promises-intro",
      "likes": 12,
    },
    {
      "title": "Mastering React Components",
      "author": "Dan Abramov",
      "url": "https://example.com/mastering-react-components",
      "likes": 30,
    },
    {
      "title": "Understanding Asynchronous JavaScript",
      "author": "Kyle Simpson",
      "url": "https://example.com/understanding-async-js",
      "likes": 20,
    }
  ]
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const getBlogByProperty = async (property) => {
  if(!property) return undefined

  const key = Object.keys(property)[0]
  
  if(!(key in Blog.schema.paths) ) {
    logger.error(`[ERROR]: property not defined in schema`)
    return
  }
  const blog = await Blog.findOne(property)
  return blog.toJSON()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }
  next()
}

const getRandomUser = async () => {
  const allUsers = await User.find({})
  const randomNumber = Math.floor(Math.random() * allUsers.length)
  return allUsers[randomNumber]
}

const getSpecificUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

const decodeToken = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    dummy,
    totalLikes,
    findFavoriteBlog,
    mostBlogs,
    mostLikes,
    mockedBlogs,
    blogsInDb,
    usersInDb,
    getBlogByProperty,
    tokenExtractor,
    getRandomUser,
    getSpecificUserById,
    decodeToken
  }