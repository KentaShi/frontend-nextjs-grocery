import axios from "axios"

const BASE_URL = "http://localhost:3030"

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const getData = async (url, headers = {}) => {
    try {
        const response = await instance.get(url, {
            headers: { ...instance.defaults.headers, ...headers },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const postData = async (url, data = null, headers = {}) => {
    try {
        const response = await instance.post(url, data, {
            headers: { ...instance.defaults.headers, ...headers },
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export default instance
