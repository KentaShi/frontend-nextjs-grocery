import axios from "axios"

const BASE_URL = "http://localhost:3030"

export const register = async (data) => {
    return await axios.post(`${BASE_URL}/api/accsess/register`, data)
}

export const login = async (data) => {
    return await axios.post(`${BASE_URL}/api/accsess/login`, data)
}
export const refreshToken = async (data) => {
    return await axios.post(`${BASE_URL}/api/accsess/refresh-token`, data)
}
