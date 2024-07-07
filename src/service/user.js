import { getData } from "@/utils/api"

export const findAllUsers = async (tokens) => {
    return await getData({ url: "/api/user", tokens })
}

export const getUserStatus = async (userId, tokens) => {
    return await getData({ url: `/api/user/${userId}/status`, tokens })
}
