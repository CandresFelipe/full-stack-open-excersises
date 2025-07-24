import { useSelector } from 'react-redux'
import { getNotificationSelector } from '../selectors/notificationSelectors'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearMessage } from '../reducers/notificationReducer'

export const Notification = () => {
  const notificationMessage = useSelector(getNotificationSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!notificationMessage) return

    const clearNMessage = setTimeout(() => {
      dispatch(clearMessage())
    }, 3000)

    return () => {
      clearTimeout(clearNMessage)
    }
  }, [notificationMessage])

  return (
    <div
      data-testid={`notification-${notificationMessage.type}`}
      className={notificationMessage.type}
    >
      {notificationMessage.message}
    </div>
  )
}
