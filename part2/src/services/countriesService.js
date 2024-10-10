import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/'

export function findCountries(searchInput) {
  return axios.get(`${URL}api/name/${searchInput}`).then((res) => res.data)
}

export function getAllCountries() {
  return axios.get(`${URL}api/all`).then((res) => res.data)
}