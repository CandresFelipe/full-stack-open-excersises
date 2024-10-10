import axios from 'axios'
import { API_KEY } from './variables'

const url ='https://api.openweathermap.org/data/2.5/weather'
const icon_url ='https://openweathermap.org/img/wn'

export function getWeatherForCountry(coords) {
  return axios.get(`${url}`, {
    lat: coords[0],
    lon: coords[1],
    appid: API_KEY,
    units: 'metric'
  }).then((res) => res.data)
}

export function getWeatherImage(icon) {
  return axios.get(`${icon_url}/${icon}@2x.png`)
}