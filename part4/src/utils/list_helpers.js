const _ = require('lodash')

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

module.exports = {
    dummy,
    totalLikes,
    findFavoriteBlog,
    mostBlogs,
    mostLikes
  }