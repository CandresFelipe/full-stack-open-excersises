import axios from 'axios'

const PROD_URL='api/persons'
const BASE_URL = import.meta.env.VITE_LOCAL_URL
const URL = `${BASE_URL}/${PROD_URL}`

function getAllPersons() {
  return axios.get(URL).then(res => res.data)
}

function updatePerson(person) {
  return axios.put(`${URL}`, person).then(res => res.data)
}

function createPerson(person) {
  return axios.post(URL, person).then(res => res.data)
}

function deletePerson(id) {
  return axios.delete(`${URL}/${id}`)
}

export default {
  getAllPersons,
  updatePerson,
  createPerson,
  deletePerson
}