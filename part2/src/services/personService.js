import axios from "axios"

const URL = "http://localhost:3001/persons"

function getAllPersons() {
    return axios.get(URL).then(res => res.data)
}

function updatePerson(person) {
    return axios.put(`${URL}/${person.id}`, person).then(res => res.data)
}

function createPerson(person) {
    return axios.post(URL, person).then(res => res.data)
}

export default {
    getAllPersons,
    updatePerson,
    createPerson,
}