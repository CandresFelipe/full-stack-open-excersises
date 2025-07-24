import { useState } from 'react'
import { Form } from './Form'
import { blogService } from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotificationState } from '../reducers/notificationReducer'

export const CreateBlog = ({ onNewBlogCreated }) => {
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const onChangeAuthor = (event) => setAuthor(event.target.value)
  const onChangeUrl = (event) => setUrl(event.target.value)
  const onChangeTitle = (event) => setTitle(event.target.value)

  const inputs = [
    {
      label: 'Title',
      testId: 'title',
      onChange: onChangeTitle,
      value: title,
    },
    {
      label: 'Author',
      testId: 'author',
      onChange: onChangeAuthor,
      value: author,
    },
    {
      label: 'Url',
      testId: 'url',
      onChange: onChangeUrl,
      value: url,
    },
  ]

  const onCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
      })
      onNewBlogCreated(newBlog)
      dispatch(
        setNotificationState({
          message: `A new blog ${newBlog?.title} by ${newBlog?.author} added!`,
          type: 'success',
        })
      )
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (error) {
      dispatch(
        setNotificationState({
          message: `Something went wrong!`,
          type: 'error',
        })
      )
      console.log('[createBlog]:', error)
    }
  }

  return (
    <div>
      <p>Create new blog</p>
      <Form inputs={inputs} onSubmit={onCreateBlog} buttonLabel={'create'} />
    </div>
  )
}
