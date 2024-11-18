import axios from 'axios'
const blogUrl = 'api/blogs'

const BASE_URL = import.meta.env.VITE_LOCAL_URL
const URL = `${BASE_URL}/${blogUrl}`
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const authHeaders = (_token) => {
  return {
    headers: {
      'Authorization': _token
    }
  }
}

const getBlogsByUser = async () => {

  const response = await axios.get(URL, authHeaders(token))

  return response.data
}

const getAll = async () => {
  const response = await axios.get(URL)

  return response.data
}

const createBlog = async (params) => {
  const response = await axios.post(`${URL}/create`,params, authHeaders(token))
  return response.data
}

const updateBlog = async (params) => {
  const response = await axios.put(`${URL}/${params.id}`,params, authHeaders(token))
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${URL}/${id}`, authHeaders(token))
  return response.data
}

export const blogService = {
  getAll,
  getBlogsByUser,
  setToken,
  createBlog,
  updateBlog,
  deleteBlog,
}