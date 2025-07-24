import { useState, useEffect, useRef } from 'react'
import { getLocalStorageToken } from './services/storage'
import { LogIn } from './components/Login'
import { blogService } from './services/blogs'
import { Logout } from './components/Logout'
import { CreateBlog } from './components/CreateBlog'
import './styles.css'
import { Notification } from './components/Notification'
import { Toggleable } from './components/Toggleable'
import { BlogList } from './components/BlogList'
import { useDispatch } from 'react-redux'
import { setBlogs } from './reducers/blogsReducer'
import { useSelector } from 'react-redux'
import { getUserAuthenticated, getUsername } from './selectors/userSelectors'

function App() {
  const dispatch = useDispatch()
  const createBlogRef = useRef(null)
  const isAuthenticated = useSelector(getUserAuthenticated)
  const username = useSelector(getUsername)

  useEffect(() => {
    if (!isAuthenticated) return
    blogService.getBlogsByUser().then((data) => {
      dispatch(setBlogs(data.blogs))
    })
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <LogIn />
  }

  return (
    <div>
      <h2>blogs</h2>
      {isAuthenticated && (
        <>
          <Notification />
          <div>
            {username} logged in <Logout />
          </div>
          <Toggleable
            ref={createBlogRef}
            testId={'create-blog'}
            toggleLabel={'Create a Blog!'}
            toggleLabelClose={'Cancel'}
          >
            <CreateBlog />
          </Toggleable>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
