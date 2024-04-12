import { postData } from "@/utils/api"

export const register = async (data) => {
    return await postData("/api/access/register", data)
}

export const login = async (data) => {
    return await postData("/api/access/login", data)
}

export const getAuth = async ({ refreshToken }) => {
    return await postData("/api/access/getAuth", { refreshToken })
}

export const refreshToken = async ({ data = null, refreshToken }) => {
    return await postData("/api/access/refresh-token", data, {
        "x-refresh-token": refreshToken,
    })
}
