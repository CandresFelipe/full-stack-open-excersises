import axios from 'axios'
import { getLocalStorageToken } from './storage'
const blogUrl = 'api/blogs'

const BASE_URL = import.meta.env.VITE_LOCAL_URL
const URL = `${BASE_URL}/${blogUrl}`
let authToken = null

const authHeaders = (_token) => {
  return {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  }
}

const getBlogsByUser = async () => {
  const token = getLocalStorageToken()
  authToken = token
  if (!token) {
    throw new Error('Token is null!')
  }
  const response = await axios.get(URL, authHeaders(authToken))

  return response.data
}

const getAll = async () => {
  const response = await axios.get(URL)

  return response.data
}

const createBlog = async (params) => {
  const response = await axios.post(
    `${URL}/create`,
    params,
    authHeaders(authToken)
  )
  return response.data
}

const updateBlog = async (params) => {
  const response = await axios.put(
    `${URL}/${params.id}`,
    params,
    authHeaders(authToken)
  )
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${URL}/${id}`, authHeaders(authToken))
  return response.data
}

export const blogService = {
  getAll,
  getBlogsByUser,
  createBlog,
  updateBlog,
  deleteBlog,
}
