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

    const authorCounts = {}

    blogs.forEach((blog) => {
       const author = blog.author.toLowerCase()

       if(authorCounts[author]) {
            authorCounts[author]+= 1
       } else {
            authorCounts[author] = 1
       }
    })

    let bestAuthor = {
        author: blogs[0].author,
        blogs: authorCounts[blogs[0].author.toLowerCase()]
    }

    for (let author in authorCounts) {
        if(authorCounts[author] > bestAuthor.blogs) {
            bestAuthor = {
                author,
                blogs: authorCounts[author]
            }
        }
    }

    return bestAuthor
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0) return null

    const authorLikesCounts = {}

    blogs.forEach((blogs) => {
        const author = blogs.author.toLowerCase()
        const likes = blogs.likes
        if(authorLikesCounts[author]) {
            authorLikesCounts[author] = authorLikesCounts[author] + likes
        }else {
            authorLikesCounts[author] = likes
        }
    })

    const authorWithMostLikes = {
        author: blogs[0].author,
        likes: authorLikesCounts[blogs[0].author.toLowerCase()]
    }

    for(let author in authorLikesCounts) {
        if(authorLikesCounts[author] > blogs.likes) {
            authorWithMostLikes = {
                author,
                likes: authorLikesCounts[author]
            }
        }
    }

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    findFavoriteBlog,
    mostBlogs,
    mostLikes
  }