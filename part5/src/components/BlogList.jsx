import { Blog } from './Blog'
import { useSelector } from 'react-redux'
import { getAllBlogs } from '../selectors/blogSelectors'

export const BlogList = () => {
  const blogs = useSelector(getAllBlogs)

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

  return (
    <div data-testid="blog-list">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
