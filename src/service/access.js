import { getData, postData } from "@/utils/api"
import axios from "axios"

export const register = async (data) => {
    return await postData("/api/access/register", data)
}

export const login = async (data) => {
    return await postData("/api/access/login", data)
}
export const refreshToken = async (data, tokens) => {
    return await postData("/api/access/refresh-token", data, {
        authentication: tokens.accessToken,
        "x-refresh-token": tokens.refreshToken,
    })
}
