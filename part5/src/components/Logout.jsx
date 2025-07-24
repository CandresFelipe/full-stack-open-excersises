import { useDispatch } from 'react-redux'
import { Button } from './Button'
import { deleteToken } from '../reducers/userReducer'

export const Logout = () => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(deleteToken())
    console.log('[logout]: Token removed')
  }

  const buttonLabel = 'logout'

  return <Button testId={buttonLabel} onClick={onLogout} label={buttonLabel} />
}
