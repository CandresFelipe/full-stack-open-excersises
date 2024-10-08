import axios from "axios"

const URL = '/api/persons'

function getAllPersons() {
    return axios.get(URL).then(res => res.data)
}

function updatePerson(person) {
    return axios.put(`${URL}/${person.id}`, person).then(res => res.data)
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