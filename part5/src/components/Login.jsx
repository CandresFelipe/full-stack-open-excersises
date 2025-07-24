import { useState } from 'react'
import { Form } from './Form'
import { loginService } from '../services/login'
import { setLocalStorageToken } from '../services/storage'
import { Notification } from './Notification'
import { useDispatch } from 'react-redux'
import { setNotificationState } from '../reducers/notificationReducer'

export const LogIn = ({ onActive }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const onChangePassword = (event) => setPassword(event.target.value)
  const onChangeUsername = (event) => setUsername(event.target.value)

  const inputs = [
    {
      label: 'Username',
      onChange: onChangeUsername,
      testId: 'username',
      value: username,
    },
    {
      label: 'Password',
      testId: 'password',
      onChange: onChangePassword,
      value: password,
    },
  ]

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      return
    }

    try {
      const res = await loginService.login({ username, password })
      setLocalStorageToken(res.token)
      onActive(true)
      dispatch(
        setNotificationState({
          message: 'Successful login!',
          type: 'success',
        })
      )
    } catch (err) {
      console.log(`[Error login]:`, err)
      dispatch(
        setNotificationState({
          message: `${err.response.data.error ? err.response.data.error : err.message}`,
          type: 'error',
        })
      )
    } finally {
      setPassword('')
      setUsername('')
    }
  }

  return (
    <div>
      <Notification />
      <h2>log in to the application</h2>
      <Form inputs={inputs} onSubmit={onSubmit} buttonLabel={'submit'} />
    </div>
  )
}
