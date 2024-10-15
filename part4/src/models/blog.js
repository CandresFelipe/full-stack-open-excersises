const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog