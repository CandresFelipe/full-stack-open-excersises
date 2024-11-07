import axios from "axios";
import { getLocalStorageToken } from "./storage";

const loginUrl = 'api/user/log-in'


const BASE_URL = import.meta.env.VITE_LOCAL_URL
const URL = `${BASE_URL}/${loginUrl}`

const login = async (data) => {
    const response = await axios.post(URL, {
        userName: data.username,
        password: data.password
    })

    return response.data;
}

const getUser = async () => {
    const token = getLocalStorageToken()

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.get(URL, config)

    return response.data
}

export const loginService = {
    login,
    getUser
}