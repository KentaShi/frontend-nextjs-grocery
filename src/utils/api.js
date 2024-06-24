import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.data.statusCode === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = Cookies.get("refresh_token")

            const res = await axios.post(
                `${BASE_URL}/api/access/refresh-token`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-refresh-token": refreshToken,
                    },
                }
            )
            Cookies.remove("refresh_token")
            Cookies.set("refresh_token", res.data.metadata.refreshToken, {
                expires: 7,
                secure: true,
            })

            originalRequest.headers["Authorization"] =
                "Bearer " + res.data.metadata.accessToken
            originalRequest.headers["X-Refresh-Token"] =
                res.data.metadata.refreshToken
            return instance(originalRequest)
        }

        return Promise.reject(error)
    }
)

export const getData = async ({ url, tokens }) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokens.accessToken}`,
            "x-refresh-token": tokens.refreshToken,
        }
        const response = await instance.get(url, {
            headers: { ...instance.defaults.headers, ...headers },
        })

        return response.data
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return {
            message: "Something went wrong, please try again later",
        }
    }
}

export const postData = async (url, data = null, tokens = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokens?.accessToken}`,
            "x-refresh-token": tokens?.refreshToken,
        }
        const response = await instance.post(url, data, {
            headers: { ...instance.defaults.headers, ...headers },
        })

        return response.data
    } catch (error) {
        if (error?.response?.data) {
            return error.response.data
        }
        return {
            message: "Something went wrong, please try again later",
        }
    }
}
export const deleteData = async (url, tokens) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokens.accessToken}`,
            "x-refresh-token": tokens.refreshToken,
        }
        const response = await instance.delete(url, {
            headers: { ...instance.defaults.headers, ...headers },
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}
export const updateData = async ({ url, data, tokens }) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokens.accessToken}`,
            "x-refresh-token": tokens.refreshToken,
        }
        const response = await instance.put(url, data, {
            headers: { ...instance.defaults.headers, ...headers },
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const upload = async (url, formData, tokens) => {
    try {
        const response = await instance.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${tokens.accessToken}`,
                "x-refresh-token": tokens.refreshToken,
            },
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export default instance
