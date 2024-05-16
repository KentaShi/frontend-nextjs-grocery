import axios from "axios"
import Cookies from "js-cookie"

const BASE_URL = "http://localhost:3030"

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

const instanceFormData = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshToken = Cookies.get("refresh_token")
            console.log(refreshToken)

            const { accessToken } = await axios.post(
                `http://localhost:3030/api/access/refresh-token`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-refresh-token": refreshToken,
                    },
                }
            )

            axios.defaults.headers.common["Authorization"] =
                "Bearer " + accessToken
            return instance(originalRequest)
        }
        return Promise.reject(error)
    }
)

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

export const postData = async (url, data = null, tokens = null) => {
    try {
        const headers = {
            authorization: `Bearer ${tokens?.accessToken}`,
            "x-refresh-token": tokens?.refreshToken,
        }
        const response = await instance.post(url, data, {
            headers: { ...instance.defaults.headers, ...headers },
        })

        return response.data
    } catch (error) {
        console.log(error)
        return {
            error: { message: "Something went wrong, please try again later" },
        }
    }
}
export const deleteData = async (url, tokens) => {
    try {
        const headers = {
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
export const updateData = async (url, data, tokens) => {
    try {
        const headers = {
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

export const upload = async (url, formData, tokens = null) => {
    try {
        // const headers = {
        //     authorization: `Bearer ${tokens?.accessToken}`,
        //     "x-refresh-token": tokens?.refreshToken,
        // }
        // const response = await instanceFormData.post(url, formData, {
        //     headers: { ...instance.defaults.headers, ...headers },
        // })

        const response = await axios.post(
            `http://localhost:3030${url}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export default instance
