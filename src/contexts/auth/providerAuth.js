"use client"

import { getAuth } from "@/service/access"
import reducer from "./reducerAuth"
import React, { createContext, useContext, useEffect, useReducer } from "react"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { AUTH_ACTIONS } from "./actionAuth"
import { useRouter } from "next/navigation"
import { errorMessages } from "@/constants"

export const initState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const refreshToken = Cookies.get("refresh_token")
            if (!refreshToken) {
                return toast.error("Vui lòng đăng nhập...")
            }
            const res = await getAuth({ refreshToken })
            if (res.statusCode === 200) {
                const metadata = res.metadata
                dispatch({
                    type: AUTH_ACTIONS.AUTH,
                    payload: {
                        user: metadata.user,
                        accessToken: metadata.tokens.accessToken,
                    },
                })
            } else if (res.statusCode === 403) {
                toast.error(errorMessages.FORBIDDEN.vi)
                router.push("/login")
            } else {
                toast.error(errorMessages.SERVER_ERROR.vi)
            }
        }

        fetchData()
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
