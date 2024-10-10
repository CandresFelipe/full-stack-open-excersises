export const Notification = ({ messsage, type }) => {
  if (!messsage && !type) {
    return null
  }

  return (
    <div className={type === 'error' ? 'error' : 'success'}>{messsage}</div>
  )
}
