const TokenKey = 'user-token'

export function setLocalStorageToken(token) {
  window.localStorage.setItem(TokenKey, token)
}

export function getLocalStorageToken() {
  const token = window.localStorage.getItem(TokenKey)
  return token
}

export function removeLocalStorageToken() {
  window.localStorage.removeItem(TokenKey)
}